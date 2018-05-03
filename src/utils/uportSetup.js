import { Connect, SimpleSigner } from 'uport-connect';

const uport = new Connect('India HouseChain', {
  clientId: '2oz6Ct7hfyoxbY3fbLpTjAJuFyaARCNYGkw',
  signer: SimpleSigner('c2337070f23f579eb977ccbdfd6d4fc6e83e0d1dea402a8bcfa4cd91a73d4933')
});

const web3 = uport.getWeb3();
export { web3, uport };