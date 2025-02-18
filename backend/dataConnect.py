# Just initializing
import sqlite3, sys, json
conn = sqlite3.connect('backend/users.db')
cursor = conn.cursor()

#checks if it is a valid login
def validLogin(username,password):
   cursor.execute(
   "SELECT * FROM users WHERE user = ?",
   (username,)
   )
   #entry =  1 tuple
   entry = cursor.fetchone() 

   if(not entry):
      return "no user found"
   else:
      if password==entry[2]:
         entry_json = json.dumps({"user": entry[1], "pass": entry[2]})
         return entry_json
      else:
         return "wrong password"
      
#Call what was passed to the script
if (sys.argv[1] == 'validLogin'):
   print(validLogin(sys.argv[2],sys.argv[3]))
else:
   print("call a function man")      

# close connection and cursor (good practice)
cursor.close()
conn.close()