import json

with open("bangladesh-address/src/json/bd-upazila.json", encoding="utf-8") as f:
    upazilas = json.load(f)

# Build district -> upazilas map
district_map = {}
for item in upazilas:
    dist = item["district"]
    up = item["upazila"]
    if dist not in district_map:
        district_map[dist] = []
    district_map[dist].append(up)

# Sorted unique districts
districts = sorted(district_map.keys())

js = f"""// Auto-generated Geo Data from bangladesh-address dataset
// District -> Upazilas mapping for cascading dropdowns

const geoDistricts = {json.dumps(districts, ensure_ascii=False)};

const geoUpazilasByDistrict = {json.dumps(district_map, ensure_ascii=False)};
"""

with open("geo-data.js", "w", encoding="utf-8") as f:
    f.write(js)
print("Done! geo-data.js generated.")
