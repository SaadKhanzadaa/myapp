async function upload() {
  const req = await fetch("http://localhost:1999/api/upload-on-blockchain", {
    method: "POST",
    headers: {
      "x-access-token": "helo",
    },
    body: {
      name: "Azikit",
      trd: "Spiral",
      q: "200",
      e: 2025,
      d: "Saadkz@yahoo.com",
      a: "Noor@Gmail.com",
    },
  });

  const data = await req.json();
  console.log(data);
}
upload();