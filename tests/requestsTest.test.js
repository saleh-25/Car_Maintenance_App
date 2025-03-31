import {checkUser, createUser, deleteUser, showEntries, setUpNotifications, sendNotification} from '../backend/requests'

describe("checkUser function", () => {
  test("Existing user with matching user/pass returns user info", async () => {
    let expected, result;
    expected = {
      "user": "crzy8",
      "pass": "6foorkiillah"
    }
    result = await checkUser("crzy8","6foorkiillah");
    expect(result).toEqual(expected);

    expected = {
      "user": "msaleh23",
      "pass": "Happydyz74"
    }
    result = await checkUser("msaleh23","Happydyz74");
    expect(result).toEqual(expected);

    expected = {
      "user": "Bobby",
      "pass": "Bob54321"
    }
    result = await checkUser("Bobby","Bob54321");
    expect(result).toEqual(expected);
  })

  test("Existing user with wrong pass returns wrong password message", async () => {
    let result;

    result = await checkUser("crzy8","fail");
    expect(result).toBe("wrong password");

    result = await checkUser("msaleh23","fail");
    expect(result).toBe("wrong password");

    result = await checkUser("Bobby","fail");
    expect(result).toBe("wrong password");
  })

  test("Nonexisting user returns no user found message", async () => {
    let result;
    result = await checkUser("fail1","6foorkiillah");
    expect(result).toBe("no user found");

    result = await checkUser("fail2","Happydyz74");
    expect(result).toBe("no user found");

    result = await checkUser("fail3","Bob54321");
    expect(result).toBe("no user found");
  })
})