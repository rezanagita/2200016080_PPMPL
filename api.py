from flask import Flask, request, jsonify

app = Flask(__name__)

books_list = [
    {
        "id": 0,
        "penulis": "Andrea Hirata",
        "judul": "Sang Pemimpi",
        "tema": "Inspirasi",
    },
    {
        "id": 1,
        "penulis": "Tere Liye",
        "judul": "Tanah Tak Bertuan",
        "tema": "Perjuangan",
    },
    {
        "id": 2,
        "penulis": "Mardiku Wowiek",
        "judul": "Mana NKRImu bung",
        "tema": "Nasionalisme",
    },
    {
        "id": 3,
        "penulis": "Alexandro Ruby",
        "judul": "DO WHAT YOU DO",
        "tema": "Inspirasi",
    },
    {
        "id": 4,
        "penulis": "Raditya Dika",
        "judul": "Malam Minggu Miko : Spesial",
        "tema": "Komedi",
    },
]

@app.route('/buku', methods=['GET', 'POST'])
def books():
    if request.method == 'GET':
        if len(books_list) > 0:
            return jsonify(books_list), 200
        else:
            return 'Not Found', 404
    
    if request.method == 'POST':
        new_penulis = request.form.get('penulis')
        new_judul = request.form.get('judul')
        new_tema = request.form.get('tema')

        if not new_penulis or not new_judul or not new_tema:
            return 'Bad Request: Missing fields', 400

        iD = books_list[-1]['id'] + 1
        new_obj = {
            'id': iD,
            'penulis': new_penulis,
            'judul': new_judul,
            'tema': new_tema
        }
        books_list.append(new_obj)
        return jsonify(new_obj), 201

@app.route('/buku/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def book_by_id(id):
    book = next((item for item in books_list if item["id"] == id), None)

    if request.method == 'GET':
        if book:
            return jsonify(book), 200
        else:
            return 'Not Found', 404

    if request.method == 'PUT':
        if book:
            book['penulis'] = request.form.get('penulis', book['penulis'])
            book['judul'] = request.form.get('judul', book['judul'])
            book['tema'] = request.form.get('tema', book['tema'])
            return jsonify(book), 200
        else:
            return 'Not Found', 404

    if request.method == 'DELETE':
        if book:
            books_list.remove(book)
            return 'Deleted', 204
        else:
            return 'Not Found', 404

if __name__ == '__main__':
    app.run(debug=True)
