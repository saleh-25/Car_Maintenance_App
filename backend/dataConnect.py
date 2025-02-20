# Just initializing
import sqlite3, sys, json
conn = sqlite3.connect('users.db')
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

def createUser(username,password):
   cursor.execute(
   "SELECT * FROM users WHERE user = ?",
   (username,))
   entry = cursor.fetchone() 

   if (not entry):
      cursor.execute(
      "INSERT INTO users(user,pass) VALUES(?,?)",
      (username,password))
      return 1
   else:
      return 0
   
def deleteUser(username):
   cursor.execute(
   "SELECT * FROM users WHERE user = ?",
   (username,))
   entry = cursor.fetchone() 
   if (entry):
      cursor.execute("DELETE FROM users WHERE user = ?", (username,))

def showEntries():
   cursor.execute('''
   SELECT * FROM users
   ''')
   values = cursor.fetchall()
   data = []
   for each in values:
      test = {"user" : each[1], "pass" : each[2]}
      data.append(test) 
      
   print(json.dumps(data))
   



#Call what was passed to the script
if (sys.argv[1] == 'validLogin'):
   print(validLogin(sys.argv[2],sys.argv[3]))
elif (sys.argv[1] == 'createUser'):
   print(createUser(sys.argv[2],sys.argv[3]))
elif (sys.argv[1] == 'deleteUser'):
   deleteUser(sys.argv[2])
elif (sys.argv[1] == 'showEntries'):
   showEntries()
else:
   print("call a function man")      

#save
conn.commit()

# close connection and cursor (good practice)
cursor.close()
conn.close()