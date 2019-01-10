// Copyright 2019 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const { AccountProvider } = require('../test_lib/utils.js');
const brandedTokenUtils = require('./utils');

contract('BrandedToken::liftRestriction', async () => {
    // TODO: add negative tests

    contract('Storage', async (accounts) => {
        const accountProvider = new AccountProvider(accounts);

        it('Successfully lifts restrictions', async () => {
            const {
                brandedToken,
            } = await brandedTokenUtils.setupBrandedToken(
                accountProvider,
            );

            const restrictionLifted = [accountProvider.get(), accountProvider.get()];
            const worker = accountProvider.get();

            assert.isOk(
                await brandedToken.liftRestriction.call(
                    restrictionLifted,
                    { from: worker },
                ),
            );

            await brandedToken.liftRestriction(
                restrictionLifted,
                { from: worker },
            );

            /* eslint-disable no-restricted-syntax, no-await-in-loop */
            for (const actor of restrictionLifted) {
                assert.isOk(
                    await brandedToken.isUnrestricted(
                        actor,
                    ),
                );
            }
            /* eslint-enable no-restricted-syntax, no-await-in-loop */
        });
    });
});