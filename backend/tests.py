import requests
import json

url = "https://api.findadogfor.me/api/activity?"
headers = {'Content-Type': 'application/json'}


# Test 1, TO-REPLACE with unit-test stuff?

filters = [dict(name='latitude', op='>', val='30'),
           dict(name='latitude', op="<", val="32"),
           dict(name='longitude', op='>', val='-98.5'),
           dict(name='longitude', op="<", val="-96.5")]
params = dict(q=json.dumps(dict(filters=filters)))
response = requests.get(url, params=params, headers=headers)
assert response.status_code == 200
print(response.json())
