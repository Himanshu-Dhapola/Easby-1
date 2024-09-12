import pandas as pd
import numpy as np
from collections import Counter
from math import log10, sqrt


data = pd.read_json('E-Commerce.products.json')
data['combined_features'] = data['category'] + ' ' + data['brand']
documents = data['combined_features'].tolist()
def tokenize(text):
    return text.lower().split()

def build_vocabulary(docs):
    vocab = set()
    for doc in docs:
        vocab.update(tokenize(doc))
    return vocab

def compute_tf(doc, vocab):
    tf = Counter(tokenize(doc))
    return {word: tf[word] / len(tokenize(doc)) for word in vocab}

def compute_idf(docs, vocab):
    idf = {}
    n_docs = len(docs)
    for word in vocab:
        containing_docs = sum(1 for doc in docs if word in tokenize(doc))
        idf[word] = log10(n_docs / (1 + containing_docs))
    return idf

def compute_tfidf(tf, idf):
    return {word: tf[word] * idf[word] for word in tf}

def compute_cosine_similarity(matrix):
    norms = np.sqrt((matrix ** 2).sum(axis=1))
    similarity = np.dot(matrix, matrix.T) / np.outer(norms, norms)
    return similarity

vocabulary = build_vocabulary(documents)
tfidf_matrix = np.zeros((len(documents), len(vocabulary)))

vocab_list = list(vocabulary)
word_to_index = {word: i for i, word in enumerate(vocab_list)}

for i, doc in enumerate(documents):
    tf = compute_tf(doc, vocabulary)
    idf = compute_idf(documents, vocabulary)
    tfidf = compute_tfidf(tf, idf)
    for word, value in tfidf.items():
        tfidf_matrix[i, word_to_index[word]] = value

cosine_sim = compute_cosine_similarity(tfidf_matrix)

def recommend_products(product_id, cosine_sim=cosine_sim):
    product_id = str(product_id)
    idx_list = data.index[data['_id'] == product_id].tolist()

    if not idx_list:
        return f"Product ID {product_id} not found in the dataset."
    
    idx = idx_list[0]
    
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:9]
    product_indices = [i[0] for i in sim_scores]

    return data.iloc[product_indices][['_id', 'title', 'description', 'discountPercentage', 'discountedPrice', 'price', 'imageUrl', 'brand']]
