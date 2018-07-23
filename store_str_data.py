import redis
import json

r=redis.Redis()

pattern='incstr:*'

data={}
for key in r.scan_iter(pattern):
    str_data = r.get(key.decode()).decode('utf-8')
    str_data_json = json.loads(json.loads(str_data))
    participants=str_data_json['participants']
    place_of_death = str_data_json['state']
    date_of_death = str_data_json['date'][-4:]
    for participant in participants:
        if 'Status' in participant and participant['Status'].strip()=='Killed':
            participant['DeathPlace'] = place_of_death
            participant['DeathDate'] = date_of_death
    data[str_data_json['incident_uri']]=participants

print(data)

with open('str_data.json', 'w') as j:
    json.dump(data, j)
