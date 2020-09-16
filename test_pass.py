from datetime import datetime
import time

f = open('pass.txt')
file_list = f.read().split('\n')

isGood = False

start_time = datetime.now()
if 'popka' in file_list:
    isGood = False
else:
    isGood = True
print(datetime.now() - start_time)

print(isGood)