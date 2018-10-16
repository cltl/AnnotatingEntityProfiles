import redis
import json

r=redis.Redis()

pattern='incdoc:*'

data={}
for key in r.scan_iter(pattern):
    list_of_docs = r.get(key.decode()).decode('utf-8')
    docs_json = json.loads(list_of_docs)
    inc=key.decode()[-6:]
    print(inc, docs_json)
    data[inc]=docs_json

print(data)

with open('../docs_data.json', 'w') as j:
    json.dump(data, j)
