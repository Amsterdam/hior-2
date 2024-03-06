import csv
import os.path

import pandas as pd
import re
import logging

from azure.storage.blob import BlobServiceClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

XLSX_FILE = os.getenv("XLSX_FILE")

# Configuration
# Sheet that contains the reference data
SHEET_NAME = "Achterkant"
FAQ_SHEET_NAME = "FAQ"
METADATA_SHEET_NAME = "Metadata"

# Columns that contain the items
TEXT = "Kerntekst"
DESCRIPTION = "Toelichting"
QUESTION = "Vraag"
ANSWER = "Antwoord"
PROPERTY = "Eigenschap"
VALUE = "Waarde"

# Colums that contain the item properties
PROPERTIES = [
    ('Theme', ['Thema', 'Subthema 1', 'Subthema 2']),
    ('Area', ['Stadsdeel']),
    ('Type', ['Type.']),
    ('Level', ['Niveau ']),
    ('Source', ['(bestuurlijke)  bron '])
]

# Columns that contain attributes
ATTRIBUTES = [
    ('Image', ['Afbeelding 1', 'Afbeelding 2', 'Afbeelding 3', 'Afbeelding 4', 'Afbeelding 5']),
    ('Link', ['Download 1', 'Download 2']),
    ('SourceLink', ['(bestuurlijke)  bron '])
]


def import_file(filename):
    # Import the HIOR Excel file
    df = pd.read_excel(filename, sheet_name=[SHEET_NAME, FAQ_SHEET_NAME, METADATA_SHEET_NAME])

    items = []
    properties = []
    attributes = []
    for row in df[SHEET_NAME].iterrows():
        id, series = row

        (item, itemProperties, itemAttributes) = import_row(id, series)
        if item != {}:
            items.append(item)
            properties = properties + itemProperties
            attributes = attributes + itemAttributes

    faqs = []
    for row in df[FAQ_SHEET_NAME].iterrows():
        id, series = row

        faq = import_faq_row(id, series)
        if faq != {}:
            faqs.append(faq)

    metadata = []
    for row in df[METADATA_SHEET_NAME].iterrows():
        id, series = row

        meta = import_meta_row(id, series)
        if meta != {}:
            metadata.append(meta)

    return {"items": items, "properties": properties, "attributes": attributes, "faqs": faqs, "metadata": metadata}


def import_row(id, series):
    # Add 2 to id because lines start at 1. Index starts at 0 and 1 line if for the header
    id = id + 2
    text = "" if pd.isnull(series[TEXT]) else series[TEXT]
    description = "" if pd.isnull(series[DESCRIPTION]) else series[DESCRIPTION]

    if len(text) == 0:
        # Skip lines with empty TEXT field
        logger.warning(f'line {id} - Missing {TEXT}')
        return ({}, [], [])

    item_properties = []
    for (name, keys) in PROPERTIES:
        values = [series[key] for key in keys]
        for value in [value for value in values if not (pd.isnull(value) or value == "")]:
            item_properties.append({"item_id": id, "name": name, "value": value})

    item_attributes = []
    for (name, keys) in ATTRIBUTES:
        values = [series[key] for key in keys]
        for value in [value for value in values if not (pd.isnull(value) or value == "")]:
            item_attributes.append({"item_id": id, "name": name, "value": value})

    _post_process(item_attributes, item_properties)
    isValid = _check_validity(id, item_properties)

    if not isValid:
        return ({}, [], [])

    item = {"id": id, "text": text, "description": description}
    return (item, item_properties, item_attributes)


def _post_process(item_attributes, item_properties):
    for property in item_properties:
        value = property["value"]
        if isinstance(value, str):
            # Levels are stored as "1. <Level name>", convert to "<Level name>"
            if property["name"] == "Level":
                value = re.sub(r'^\d\. ', '', value)
            # Uniform values, transform string like "aap noot " to "Aap Noot"
            value = value.title().strip()
            property["value"] = value
    for attribute in item_attributes:
        value = attribute["value"]
        if isinstance(value, str):
            value = re.sub(r'\\', '/', value)  # Correction for Windows path names
            attribute["value"] = value.strip()


def _check_validity(id, item_properties):
    isValid = True
    for (name, _) in PROPERTIES:
        props = [property["value"] for property in item_properties if property["name"] == name]
        isPropValid = len(props) > 0
        if not isPropValid:
            logger.warning(f'line {id} - Missing property {name}')
            isValid = False
    return isValid


def import_faq_row(id, series):
    # Add 2 to id because lines start at 1. Index starts at 0 and 1 line if for the header
    id = id + 2
    question = "" if pd.isnull(series[QUESTION]) else series[QUESTION].strip()
    answer = "" if pd.isnull(series[ANSWER]) else series[ANSWER].strip()

    if len(question) == 0 or len(answer) == 0:
        # Skip lines with empty TEXT field
        logger.warning(f'line {id} - Missing Q: {QUESTION} or A: {ANSWER}')
        return {}

    return {"id": id, "question": question, "answer": answer}


def import_meta_row(id, series):
    # Add 2 to id because lines start at 1. Index starts at 0 and 1 line if for the header
    id = id + 2
    property = "" if pd.isnull(series[PROPERTY]) else series[PROPERTY].strip()
    value = "" if pd.isnull(series[VALUE]) else series[VALUE]

    if len(property) == 0:
        # Skip lines with empty TEXT field
        logger.warning(f'line {id} - Missing property: {property} or value: {value}')
        return {}

    return {"id": id, "property": property, "value": f'{value}'}


def save_to_csv(dataset: list[dict], filename: str):
    headers = dataset[0].keys()
    with open(os.path.join('/tmp', filename), 'w', newline='') as output_file:
        dict_writer = csv.DictWriter(output_file, headers)
        dict_writer.writeheader()
        dict_writer.writerows(dataset)
    logger.info(f'Saved {len(dataset)} items to {filename}')


def upload_data_to_blob_storage(datasets):
    # Get connection string and container name from environment variables
    connection_string = os.environ.get('AZURE_STORAGE_CONNECTION_STRING')
    container_name = os.environ.get('AZURE_STORAGE_CONTAINER_NAME_CSV')
    blob_service_client = BlobServiceClient.from_connection_string(connection_string)
    container_client = blob_service_client.get_container_client(container_name)
    for ds in datasets:
        blob_client = container_client.get_blob_client(f'{ds}.csv')
        with open(os.path.join('/tmp', f'{ds}.csv'), "rb") as data:
            blob_client.upload_blob(data, overwrite=True)
        logger.info(f'Uploaded {ds}.csv to Azure Blob Storage')


def main():
    data = import_file(XLSX_FILE)

    # Save all data to csv
    datasets = ["items", "properties", "attributes", "faqs", "metadata"]
    for ds in datasets:
        save_to_csv(data[ds], f'{ds}.csv')

    # Upload data to Azure Blob Storage
    if os.environ.get('AZURE_STORAGE_CONNECTION_STRING'):
        upload_data_to_blob_storage(datasets)
    else:
        logger.info('Skipping upload to Azure Blob Storage')


if __name__ == '__main__':
    main()
