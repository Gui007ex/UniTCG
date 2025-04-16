from flask import Flask, jsonify
import os
import psycopg2

app = Flask(__name__)

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('DB_HOST'),
        dbname=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD')
    )

@app.route('/')
def index():
    return jsonify({'message': 'usuario API funcionando!'})

@app.route('/usuarios')
def get_usuarios():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY, nome TEXT);')
    cur.execute('INSERT INTO usuarios (nome) VALUES (%s);', ('Usuario Teste',))
    conn.commit()
    cur.execute('SELECT * FROM usuarios;')
    usuarios = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(usuarios)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
