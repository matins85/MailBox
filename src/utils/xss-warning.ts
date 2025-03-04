export function selfXSSWarning() {
  setTimeout(() => {
    console.log(
      "%c** STOP **",
      "font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding: 5px 15px; border-radius: 25px;"
    );
    console.log(
      `\n%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.`,
      "font-weight:bold; font: 2em Arial; color: #e11d48;"
    );
  });
}
