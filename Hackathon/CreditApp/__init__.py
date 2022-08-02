from flask import Flask, request
from .blueprints.AdminCRUD_view import bp

import mariadb
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote

app = Flask(__name__)
app.register_blueprint(bp)

def connect():
    '''Enter database details, such as user, password, host, port and database to connect to
    the database of choice'''
    try:
        conn = mariadb.connect(
            user="SvcSGTDEVSaserTwoAdmnAcc",
            password="5vc5GTD3V5@s3rTw0@dmn@cc",
            host="SRV007893",
            port=3306,
            database="SGTDEVSaserTwo"
        )
        return conn
    except mariadb.Error as e:
        return(print(f"Error connecting to MariaDB Platform: {e}"))