import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center p-4">
      <p>Cargando...</p>
    </div>
  );
}


export default React.memo(Loader);
