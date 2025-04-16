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
    return jsonify({'message': 'Produto API funcionando!'})

@app.route('/produtos')
def get_produtos():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS produtos (id SERIAL PRIMARY KEY, nome TEXT);')
    cur.execute('INSERT INTO produtos (nome) VALUES (%s);', ('Produto Teste',))
    conn.commit()
    cur.execute('SELECT * FROM produtos;')
    produtos = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(produtos)

if __name__ == '__main__':
    app.run(host='0.0.0.0')
