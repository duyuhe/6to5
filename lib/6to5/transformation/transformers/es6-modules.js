var t = require("../../types");

exports.ImportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.specifiers.length) {
    for (var i in node.specifiers) {
      file.moduleFormatter.importSpecifier(node.specifiers[i], node, nodes, parent);
    }
  } else {
    file.moduleFormatter.importDeclaration(node, nodes, parent);
  }

  return nodes;
};

exports.ExportDeclaration = function (node, parent, file) {
  var nodes = [];

  if (node.declaration) {
    // make sure variable exports have an initialiser
    // this is done here to avoid duplicating it in the module formatters
    if (t.isVariableDeclaration(node.declaration)) {
      var declar = node.declaration.declarations[0];
      declar.init = declar.init || t.identifier("undefined");
    }

    file.moduleFormatter.exportDeclaration(node, nodes, parent);
  } else {
    for (var i in node.specifiers) {
      file.moduleFormatter.exportSpecifier(node.specifiers[i], node, nodes, parent);
    }
  }

  return nodes;
};
