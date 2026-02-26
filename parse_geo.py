import json

with open("bangladesh-address/src/json/bd-upazila.json", encoding="utf-8") as f:
    upazilas = json.load(f)

# Build division -> districts map
division_district_map = {}
district_upazila_map = {}

for item in upazilas:
    div  = item["division"]
    dist = item["district"]
    up   = item["upazila"]

    if div not in division_district_map:
        division_district_map[div] = set()
    division_district_map[div].add(dist)

    if dist not in district_upazila_map:
        district_upazila_map[dist] = []
    if up not in district_upazila_map[dist]:
        district_upazila_map[dist].append(up)

# Convert sets to sorted lists
divisions = sorted(division_district_map.keys())
div_dist_sorted = {div: sorted(dists) for div, dists in division_district_map.items()}

js = f"""// Auto-generated Geo Data from bangladesh-address dataset
// Division -> Districts -> Upazilas cascading maps

const geoDivisions = {json.dumps(divisions, ensure_ascii=False)};

const geoDistrictsByDivision = {json.dumps(div_dist_sorted, ensure_ascii=False)};

const geoUpazilasByDistrict = {json.dumps(district_upazila_map, ensure_ascii=False)};
"""

with open("geo-data.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Done!")
