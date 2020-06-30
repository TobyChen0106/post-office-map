from firefox import * 
import pymongo
from bson import BSON 

# connect to mongodb atlas
client = pymongo.MongoClient("mongodb+srv://Toby0106:dbforcardbo@cluster0-gfwld.mongodb.net/test?retryWrites=true&w=majority")
db = client["poster_api"]
collect = db["poster"]


webpage = "https://ecounter.post.gov.tw/RS_PhoneLogin.aspx"
checkpage = "https://ecounter.post.gov.tw/RS_OnlineNo_SelectBranch.aspx"
phone_num = "0911805479"
data = parsePosterData(checkpage, phone_num, full=False)

# insert data to db
for d in data:
    post_id = collect.insert_one(d).inserted_id
    print(len(data), ' card data postID:　',post_id)