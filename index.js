const { Command } = require("commander");

const contactsService = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      console.log(allContacts);
      break;
    case "get":
      const contactById = await contactsService.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsService.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//   action: "add",
//   name: "James Voznyi",
//   email: "james.v@gmail.com",
//   phone: "(992) 914-3795",
// });
// invokeAction({ action: "remove", id: "qdggE76Jtbfd9eWJHrssH" });
