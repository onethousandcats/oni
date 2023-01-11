import zlib from "zlib";

const zip = (input) => {
  return zlib.deflateSync(input).toString('base64');
};

const unzip = (zipped) => {
  return zlib.inflateSync(new Buffer(zipped, 'base64')).toString();
}

export { zip, unzip };