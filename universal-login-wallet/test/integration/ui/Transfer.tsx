import {expect} from 'chai';
import {ReactWrapper} from 'enzyme';
import {providers, utils, Contract} from 'ethers';
import {createFixtureLoader} from 'ethereum-waffle';
import {setupSdk} from '@universal-login/sdk/test';
import {deployMockToken} from '@universal-login/commons/test';
import {Services} from '../../../src/services/Services';
import {setupUI} from '../helpers/setupUI';
import {AppPage} from '../pages/AppPage';

describe('UI: Transfer', () => {
  let appWrapper: ReactWrapper;
  let services: Services;
  let relayer: any;
  let appPage: AppPage;
  let provider: providers.Provider;
  let mockTokenContract: Contract;
  const receiverAddress = '0x0000000000000000000000000000000000000001';

  before(async () => {
    ({relayer, provider} = await setupSdk({overridePort: '33113'}));
    ({mockTokenContract} = await createFixtureLoader(provider as providers.Web3Provider)(deployMockToken));
    ({appWrapper, appPage, services} = await setupUI(relayer, mockTokenContract.address));
  });

  it('Creates wallet and transfers tokens', async () => {
    const walletAddress = services.walletService.userWallet ? services.walletService.userWallet.contractAddress : '0x0';
    await mockTokenContract.transfer(walletAddress, utils.parseEther('2.0'));

    appPage.dashboard().clickTransferButton();
    appPage.transfer().enterTransferDetails(receiverAddress, '1');

    const tokenBalance = await appPage.dashboard().getBalance(mockTokenContract, walletAddress);
    expect(tokenBalance).to.eq('999967615000000000');
  });

  after(async () => {
    services.balanceService.stop();
    appWrapper.unmount();
    await relayer.stop();
  });
});
