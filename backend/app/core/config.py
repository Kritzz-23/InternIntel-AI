from dotenv import load_dotenv
import os

load_dotenv()

PROJECT_NAME = os.getenv("PROJECT_NAME")
VERSION = os.getenv("VERSION")
DEBUG = os.getenv("DEBUG")