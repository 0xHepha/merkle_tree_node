const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
    // TODO: how do we prove to the server we're on the nice list?
    const merkleTree = new MerkleTree(niceList);
    const name = "Mr. Rodolfo Stark";
    const index = niceList.findIndex((n) => n === name);
    const proof = merkleTree.getProof(index);

    const data = { proof: proof, name: name };

    try {
        const { data: gift } = await axios.post(`${serverUrl}/gift`, data);
        console.log(gift);
    } catch (error) {
        console.log(error.response.data);
    }
}

main();
