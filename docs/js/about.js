let initialization = () => {
  var sidenavs = M.Sidenav.init(D.queryAll('.sidenav'));
}

if (D.readyState === 'loading')
  D.addEventListener('DOMContentLoaded', initialization);
else
  initialization();