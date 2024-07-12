const consoleArt =
  "###############################################\r\n#                                             #\r\n#         _ _   _                        _    #\r\n#     ___(_| |_(_) ___ ___    __ _ _ __ (_)   #\r\n#    / __| | __| |/ _ / __|  / _` | '_ \\| |   #\r\n#   | (__| | |_| |  __\\__ \\ | (_| | |_) | |   #\r\n#    \\___|_|\\__|_|\\___|___/  \\__,_| .__/|_|   #\r\n#                                 |_|         #\r\n#                                             #\r\n#              by hasan yurdakul              #\r\n###############################################";

var twirlTimer = function () {
  var P = [
    "@@INFO: ▄  WAITING FOR REQUESTS",
    "@@INFO: ▀  WAITING FOR REQUESTS",
    "@@INFO:  ▀ WAITING FOR REQUESTS",
    "@@INFO:  ▄ WAITING FOR REQUESTS",
  ];
  var x = 0;
  return setInterval(function () {
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 150);
};

module.exports = { consoleArt, twirlTimer };
