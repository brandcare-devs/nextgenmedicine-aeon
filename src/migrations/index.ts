import * as migration_20260327_021215 from './20260327_021215';
import * as migration_20260330_003621 from './20260330_003621';
import * as migration_20260330_021426 from './20260330_021426';
import * as migration_20260330_022232 from './20260330_022232';
import * as migration_20260330_023946 from './20260330_023946';
import * as migration_20260330_024909 from './20260330_024909';
import * as migration_20260331_215605 from './20260331_215605';
import * as migration_20260331_223600 from './20260331_223600';
import * as migration_20260401_114655 from './20260401_114655';
import * as migration_20260402_093355_add_speaker_order from './20260402_093355_add_speaker_order';
import * as migration_20260407_224332 from './20260407_224332';
import * as migration_20260407_230141 from './20260407_230141';
import * as migration_20260410_141216 from './20260410_141216';
import * as migration_20260417_145059_add_site_settings from './20260417_145059_add_site_settings';
import * as migration_20260421_120341 from './20260421_120341';
import * as migration_20260421_161036 from './20260421_161036';
import * as migration_20260422_021700_partner_form_to_select from './20260422_021700_partner_form_to_select';
import * as migration_20260423_202730_add_footer_contact_email from './20260423_202730_add_footer_contact_email';
import * as migration_20260616_170500_add_partner_website from './20260616_170500_add_partner_website';

export const migrations = [
  {
    up: migration_20260327_021215.up,
    down: migration_20260327_021215.down,
    name: '20260327_021215',
  },
  {
    up: migration_20260330_003621.up,
    down: migration_20260330_003621.down,
    name: '20260330_003621',
  },
  {
    up: migration_20260330_021426.up,
    down: migration_20260330_021426.down,
    name: '20260330_021426',
  },
  {
    up: migration_20260330_022232.up,
    down: migration_20260330_022232.down,
    name: '20260330_022232',
  },
  {
    up: migration_20260330_023946.up,
    down: migration_20260330_023946.down,
    name: '20260330_023946',
  },
  {
    up: migration_20260330_024909.up,
    down: migration_20260330_024909.down,
    name: '20260330_024909',
  },
  {
    up: migration_20260331_215605.up,
    down: migration_20260331_215605.down,
    name: '20260331_215605',
  },
  {
    up: migration_20260331_223600.up,
    down: migration_20260331_223600.down,
    name: '20260331_223600',
  },
  {
    up: migration_20260401_114655.up,
    down: migration_20260401_114655.down,
    name: '20260401_114655',
  },
  {
    up: migration_20260402_093355_add_speaker_order.up,
    down: migration_20260402_093355_add_speaker_order.down,
    name: '20260402_093355_add_speaker_order',
  },
  {
    up: migration_20260407_224332.up,
    down: migration_20260407_224332.down,
    name: '20260407_224332',
  },
  {
    up: migration_20260407_230141.up,
    down: migration_20260407_230141.down,
    name: '20260407_230141',
  },
  {
    up: migration_20260410_141216.up,
    down: migration_20260410_141216.down,
    name: '20260410_141216',
  },
  {
    up: migration_20260417_145059_add_site_settings.up,
    down: migration_20260417_145059_add_site_settings.down,
    name: '20260417_145059_add_site_settings',
  },
  {
    up: migration_20260421_120341.up,
    down: migration_20260421_120341.down,
    name: '20260421_120341',
  },
  {
    up: migration_20260421_161036.up,
    down: migration_20260421_161036.down,
    name: '20260421_161036'
  },
  {
    up: migration_20260422_021700_partner_form_to_select.up,
    down: migration_20260422_021700_partner_form_to_select.down,
    name: '20260422_021700_partner_form_to_select'
  },
  {
    up: migration_20260423_202730_add_footer_contact_email.up,
    down: migration_20260423_202730_add_footer_contact_email.down,
    name: '20260423_202730_add_footer_contact_email'
  },
  {
    up: migration_20260616_170500_add_partner_website.up,
    down: migration_20260616_170500_add_partner_website.down,
    name: '20260616_170500_add_partner_website'
  },
];
