# https://stackoverflow.com/questions/46395314/scraping-aspx-page-with-python
import urllib
from bs4 import BeautifulSoup

headers = {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.17 (KHTML, like Gecko)  Chrome/24.0.1312.57 Safari/537.17',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'gzip,deflate,sdch',
    'Accept-Language': 'en-US,en;q=0.8',
    'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3'
}

class MyOpener(urllib.FancyURLopener):
    version = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17'

myopener = MyOpener()
url = 'https://ecounter.post.gov.tw/RS_PhoneLogin.aspx'
# first HTTP request without form data
f = myopener.open(url)
soup_dummy = BeautifulSoup(f,"html5lib")
# parse and retrieve two vital form values
viewstate = soup_dummy.select("#__VIEWSTATE")[0]['value']
viewstategen = soup_dummy.select("#__VIEWSTATEGENERATOR")[0]['value']

soup_dummy.find(id="ctl00_MainContent_category")

#search for the string 'input' to find the form data
formData = (
    ('__VIEWSTATE', viewstate),
    ('__VIEWSTATEGENERATOR', viewstategen),
    ('ctl00$MainContent$transport', '200'),
    ('ctl00$MainContent$quantity','1'),
    ('ctl00$MainContent$wastepct','100')
)

encodedFields = urllib.urlencode(formData)
# second HTTP request with form data
f = myopener.open(url, encodedFields)
soup = BeautifulSoup(f,"html5lib")
trans_emissions = soup.find("span", id="ctl00_MainContent_transEmissions")
print(trans_emissions.text)