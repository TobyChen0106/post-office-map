import datetime

from datetime import timezone, datetime, timedelta

d = datetime.now().astimezone(timezone.utc)
print(d)
print(d.strftime('%Y-%m-%dT%H:%M:%S.%fZ'))
# d.astimezone(timezone.utc).strftime('%Y-%m-%d %H:%M:%S.%f')