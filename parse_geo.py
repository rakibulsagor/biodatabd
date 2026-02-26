import json

with open("bd-geo-info-main/src/data/bd-districts.json") as f:
    d = json.load(f)["districts"]
with open("bd-geo-info-main/src/data/bd-upazilas.json") as f:
    u = json.load(f)["upazilas"]
with open("bd-geo-info-main/src/data/bd-postcodes.json") as f:
    p = json.load(f)["postcodes"]
with open("bd-geo-info-main/src/data/unions.json") as f:
    un = json.load(f)

# Arrays for simpler looping in JS
zilla_list = [{"id": x["id"], "name": f'{x["name"]} / {x["bn_name"]}'} for x in d]

upazila_map = {}
for x in u:
    dist_id = x["district_id"]
    if dist_id not in upazila_map:
        upazila_map[dist_id] = []
    upazila_map[dist_id].append({
        "id": x["id"],
        "name": f'{x["name"]} / {x["bn_name"]}'
    })

postcode_map = {}
for x in p:
    dist_id = x.get("district_id", "")
    if dist_id not in postcode_map:
        postcode_map[dist_id] = []
    postcode_map[dist_id].append(f'{x["postCode"]} - {x["postOffice"]}')

union_map = {}
for x in un:
    up_id = x["upazilla_id"]
    if up_id not in union_map:
        union_map[up_id] = []
    union_map[up_id].append(f'{x["name"]} / {x["bn_name"]}')

js_content = f"""// Generated Geo Data for BiodataBD
const geoZillas = {json.dumps(zilla_list, ensure_ascii=False)};
const geoUpazilas = {json.dumps(upazila_map, ensure_ascii=False)};
const geoPostcodes = {json.dumps(postcode_map, ensure_ascii=False)};
const geoUnions = {json.dumps(union_map, ensure_ascii=False)};
"""

with open("geo-data.js", "w", encoding="utf-8") as f:
    f.write(js_content)
