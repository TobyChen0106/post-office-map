from firefox import *
import pymongo
from bson import BSON
from CardboDB import CardboDB
import re
db = CardboDB(
    "mongodb+srv://cardbo:69541@cardbo-br3ga.gcp.mongodb.net/dbCardbo?retryWrites=true&w=majority", "dbCardbo")
# mongodb+srv://cardbo:<password>@cardbo-br3ga.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority

webpage = "https://ecounter.post.gov.tw/RS_PhoneLogin.aspx"
checkpage = "https://ecounter.post.gov.tw/RS_OnlineNo_SelectBranch.aspx"
phone_num = "0911805479"
# data = parsePosterData(checkpage, phone_num, full=False)

# insert data to db
allPost = db.getData("postoffices")

for p in allPost:
    # print(p["storeNm"])
    print(re.split(re.escape('('), p["storeNm"])[0])

# for d in data:
#     print(d.poster_name)
