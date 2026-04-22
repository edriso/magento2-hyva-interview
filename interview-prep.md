# Magento 2 Interview Prep — Simple English

> Study this file point by point. Each section has: what it is, an analogy, key facts, and a test question.

---

## Point 1 — What is Magento 2?

**What it is:**
Magento 2 is an open-source e-commerce platform. You install it on a server, and it gives you a full online store — product pages, cart, checkout, admin panel, everything. You can customize it deeply with PHP code.

**Analogy:**
Think of Magento like a giant LEGO set. The base set gives you a working store. You add your own LEGO pieces (modules) on top without breaking the original.

**Key facts:**
- Written in PHP, uses MySQL database
- Very powerful for large stores (thousands of products, B2B features)
- More complex than Shopify/WooCommerce — that's its strength AND weakness
- Adobe owns it now (Adobe Commerce = paid version, Magento Open Source = free)
- Organized into **modules** — each feature lives in its own folder

**Why companies choose it over Shopify:**
- You own the server (more control)
- Deep B2B features built-in (company accounts, custom pricing)
- Unlimited customization
- Self-hosted = no monthly fees per transaction

**Test yourself:** Why would a big B2B company pick Magento over Shopify?

---

## Point 2 — Module Structure

**What it is:**
All code in Magento lives inside **modules**. A module is just a folder with a specific structure. Each module does one thing (handles products, handles checkout, etc.).

**Analogy:**
A module is like a plugin for WordPress, or an app on your phone. You can enable/disable it, and it doesn't break other things.

**Standard module folder structure:**
```
app/code/Vendor/ModuleName/
├── registration.php          ← tells Magento "I exist"
├── etc/
│   ├── module.xml            ← module name + version
│   ├── di.xml                ← dependency injection config
│   └── events.xml            ← event listeners
├── Plugin/                   ← interceptors (plugins)
├── Observer/                 ← event observers
├── ViewModel/                ← PHP logic for templates
├── Setup/Patch/Data/         ← database patches
└── view/
    └── frontend/
        ├── layout/           ← page structure XML
        ├── templates/        ← .phtml files (HTML + PHP)
        └── web/              ← JS, CSS, images
```

**Key facts:**
- `registration.php` is required — without it, Magento ignores the module
- `etc/module.xml` declares the module name like `Vendor_ModuleName`
- Enable a module: `bin/magento module:enable Vendor_ModuleName`
- Then run: `bin/magento setup:upgrade`

**Test yourself:** If you create a new module, what 2 files does Magento need to know it exists?

---

## Point 3 — MVC Architecture (How a Request Flows)

**What it is:**
When someone visits a page, Magento processes it in steps: Model → View → Controller. This is called MVC.

**Analogy:**
Think of a restaurant:
- **Controller** = waiter (takes your order, decides what to do)
- **Model** = kitchen (gets/saves data from the database)
- **View** = the plate of food (what the customer sees)

**The full flow:**
```
Browser request
    → index.php (entry point)
    → Router (finds the right Controller based on URL)
    → Controller (handles the request logic)
    → Block / ViewModel (prepares data for the template)
    → Layout XML (decides which template to use)
    → Template .phtml (outputs HTML)
    → Browser gets HTML
```

**Key facts:**
- URL pattern: `domain.com/module/controller/action`
- Example: `domain.com/catalog/product/view` → catalog module, product controller, view action
- **Block** = old way to pass data to templates (still used)
- **ViewModel** = newer, cleaner way to pass data to templates (use this)
- Layout XML is the "glue" that connects templates to pages

**Test yourself:** A user visits `/checkout/cart/index`. Which module handles this, and what does the Controller roughly do?

---

## Point 4 — Layout XML

**What it is:**
Layout XML files are like blueprints for pages. They tell Magento: "On the product page, show these blocks in this order."

**Analogy:**
Layout XML is like a floor plan for a house. It doesn't contain furniture (content), it just says where rooms (blocks) go and what goes inside each room.

**How it works:**
```xml
<!-- catalog_product_view.xml — runs on product pages only -->
<page>
    <body>
        <referenceContainer name="content">
            <block class="Vendor\Module\Block\MyBlock"
                   name="my.block"
                   template="Vendor_Module::my-template.phtml" />
        </referenceContainer>
    </body>
</page>
```

**Key directives:**
- `<referenceContainer name="content">` — target an existing area
- `<block>` — add a new block/template
- `<remove name="block.name">` — remove a block from a page
- `<move element="x" destination="y">` — move a block somewhere else
- `default.xml` — runs on ALL pages
- `catalog_product_view.xml` — runs only on product pages

**Key facts:**
- File name = page handle (what page it applies to)
- You never edit core layout files — you create your own in your theme/module
- This is how you add/remove content without touching core PHP

**Test yourself:** How would you remove a block from only the product page, not all pages?

---

## Point 5 — Plugins (Interceptors)

**What it is:**
A plugin lets you add code before, after, or around any public method in Magento — without editing the original class. This is the #1 way to customize Magento safely.

**Analogy:**
Think of a plugin like a security guard at a door. Before someone enters (before plugin), you can check them. After they leave (after plugin), you can log it. You can even stop them or redirect them (around plugin).

**Three types:**
| Type | When it runs | Can change result? |
|------|-------------|-------------------|
| `before` | Before the original method | Can change input arguments |
| `after` | After the original method | Can change the return value |
| `around` | Wraps the original | Full control (can skip original!) |

**How to register a plugin (di.xml):**
```xml
<type name="Magento\Catalog\Model\Product">
    <plugin name="my_product_plugin"
            type="Vendor\Module\Plugin\ProductPlugin" />
</type>
```

**The plugin class:**
```php
class ProductPlugin
{
    public function afterGetName(\Magento\Catalog\Model\Product $subject, $result)
    {
        return $result . ' (Sale!)'; // adds "(Sale!)" to every product name
    }
}
```

**Key facts:**
- Plugins only work on **public** methods
- Plugin method names: `beforeMethodName`, `afterMethodName`, `aroundMethodName`
- `around` plugins are powerful but slow — prefer `before`/`after` when possible
- Registered in `etc/di.xml`

**Test yourself:** You want to add " - Free Shipping" to every product name without editing core. Which plugin type would you use and why?

---

## Point 6 — Events & Observers

**What it is:**
Magento fires "events" when things happen (a product is saved, an order is placed, etc.). You can write an Observer to "listen" for that event and run your own code.

**Analogy:**
Think of events like a fire alarm. When the alarm fires (event), the sprinklers turn on (observer). The alarm doesn't know about the sprinklers — they just react to it.

**How to register an observer (events.xml):**
```xml
<event name="checkout_submit_all_after">
    <observer name="my_order_observer"
              instance="Vendor\Module\Observer\OrderObserver" />
</event>
```

**The observer class:**
```php
class OrderObserver implements ObserverInterface
{
    public function execute(Observer $observer)
    {
        $order = $observer->getData('order');
        // do something with the order
    }
}
```

**Common Magento events:**
- `checkout_submit_all_after` — order placed
- `catalog_product_save_after` — product saved in admin
- `customer_login` — customer logged in
- `sales_order_place_after` — order placed (alternative)

**Plugin vs Observer — when to use which:**
| | Plugin | Observer |
|-|--------|----------|
| Use when | You need to change a method's input/output | You need to react to something that happened |
| Works on | Any public method | Only Magento-fired events |
| Can modify data? | Yes | Harder (event data is sometimes read-only) |

**Test yourself:** You want to send an email every time an order is placed. Would you use a Plugin or an Observer? Why?

---

## Point 7 — Dependency Injection (DI)

**What it is:**
Instead of creating objects yourself inside a class, Magento "injects" (passes) them to you through the constructor. This is Dependency Injection.

**Analogy:**
Imagine you need a pen to write. Bad way: you make the pen yourself every time you need to write. Good way: someone hands you a pen when you sit down. DI is the "someone hands you the pen" approach.

**Bad way (don't do this):**
```php
class MyClass
{
    public function doSomething()
    {
        $product = new \Magento\Catalog\Model\Product(); // creating manually = bad
    }
}
```

**Good way (DI):**
```php
class MyClass
{
    private $productRepository;

    public function __construct(
        \Magento\Catalog\Api\ProductRepositoryInterface $productRepository
    ) {
        $this->productRepository = $productRepository; // Magento injects it
    }
}
```

**Key facts:**
- Magento automatically reads your constructor and injects what you need
- Always inject **interfaces** (e.g., `ProductRepositoryInterface`), not concrete classes
- Why interfaces? You can swap the implementation later without changing your class
- `di.xml` — use `<preference>` to say "when someone asks for Interface X, give them Class Y"

**`di.xml` preference example:**
```xml
<preference for="Magento\Catalog\Api\ProductRepositoryInterface"
            type="Magento\Catalog\Model\ProductRepository" />
```

**Test yourself:** Why should you inject `ProductRepositoryInterface` instead of `ProductRepository` directly?

---

## Point 8 — Data Patches

**What it is:**
A Data Patch is a PHP class that runs once during `setup:upgrade` to make changes to the database (add a CMS block, set a config value, create an attribute, etc.).

**Analogy:**
Think of a Data Patch like a one-time task on a checklist. Once it's done, it's marked complete and never runs again — even if you run `setup:upgrade` 100 times.

**Structure:**
```php
class AddWelcomeBanner implements DataPatchInterface
{
    public function apply()
    {
        // do your one-time DB change here
        // e.g., create a CMS block, set a config value
    }

    public static function getDependencies(): array
    {
        return []; // list other patches that must run first
    }

    public function getAliases(): array
    {
        return [];
    }
}
```

**Key facts:**
- Place in: `Setup/Patch/Data/MyPatch.php`
- Magento tracks applied patches in the `patch_list` DB table
- NEVER modify a deployed patch — create a new one instead
- Use for: CMS blocks, config settings, product attributes, customer attributes
- `Schema Patches` = change DB structure (add/remove columns)
- `Data Patches` = change DB content (insert/update data)

**Test yourself:** You need to add a config value when the module is installed. Should you use a Data Patch or a Plugin? Why?

---

## Point 9 — EAV Model

**What it is:**
EAV = Entity-Attribute-Value. It's how Magento stores product attributes in the database. Instead of one giant table with hundreds of columns, it splits data across small tables.

**Analogy:**
Normal database: one big spreadsheet with a column for every product property.
EAV: a notebook where each page says "Product #5, attribute: color, value: red". Very flexible but slower to query.

**Why Magento uses it:**
- You can add custom product attributes without changing the DB schema
- Products can have different sets of attributes (a shirt has "size", a TV has "screen size")

**The 3 tables:**
- `eav_entity` — what type of entity (product, customer, category)
- `eav_attribute` — the attribute definition (name, type, label)
- `eav_entity_varchar/int/decimal/datetime/text` — the actual values (split by data type)

**Key facts:**
- EAV makes Magento flexible but complex and sometimes slow
- That's why Magento also has "flat tables" for faster reads
- You'll hear this in interviews — just explain it's "flexible but complex"

**Test yourself:** Why does Magento use EAV instead of just adding a column to the product table every time someone wants a new attribute?

---

## Point 10 — What is Hyvä?

**What it is:**
Hyvä is a replacement for the default Magento frontend theme (called "Luma"). It removes old, heavy technology and replaces it with fast, modern tools.

**What the old Luma theme used (slow):**
- RequireJS — loads JS files one by one (slow)
- KnockoutJS — heavy JavaScript framework
- Bootstrap 3 — old CSS framework
- Result: 800KB+ of JavaScript, Lighthouse score 30-50

**What Hyvä uses (fast):**
- Alpine.js — tiny, simple JavaScript (15KB)
- TailwindCSS — utility-first CSS
- Result: ~40KB of JavaScript, Lighthouse score 90+

**The numbers to remember:**
| | Luma | Hyvä |
|-|------|------|
| JS bundle size | 800KB+ | ~40KB |
| Lighthouse score | 30–50 | 90+ |
| Page speed | Slow | Fast |

**Analogy:**
Luma is like a diesel truck — powerful but heavy and slow to start. Hyvä is like a sports car — lighter, faster, modern.

**Key facts:**
- Hyvä is a paid theme (~1,000 EUR) but widely adopted
- Replaces `.xml` layout + KnockoutJS with Alpine.js in `.phtml` templates
- You still use Magento's backend, routing, modules — just the frontend changes
- Your projects (SGD, Gemoss, Satoshi) all used Hyvä

**Test yourself:** What 2 JavaScript tools does Hyvä replace KnockoutJS + RequireJS with?

---

## Point 11 — Alpine.js Basics (10 Key Directives)

**What it is:**
Alpine.js is a tiny JavaScript library used in Hyvä. You write it directly in HTML using special attributes (called directives). No separate JS file needed for simple things.

**Analogy:**
Alpine.js is like writing instructions on sticky notes directly on the HTML element. "Hey button, when clicked, show this div."

**The 10 directives you must know:**

| Directive | What it does | Example |
|-----------|-------------|---------|
| `x-data` | Declares reactive state (like a mini store) | `x-data="{ open: false }"` |
| `x-show` | Show/hide (keeps element in DOM) | `x-show="open"` |
| `x-if` | Show/hide (removes from DOM) | `<template x-if="open">` |
| `x-text` | Sets text content reactively | `x-text="count"` |
| `x-model` | Two-way binding for inputs | `x-model="email"` |
| `@click` | Click event listener | `@click="open = true"` |
| `x-for` | Loop over array | `x-for="item in items"` |
| `:class` / `x-bind` | Dynamic attributes | `:class="{ active: open }"` |
| `$dispatch` | Fire a custom event | `$dispatch('add-to-cart', {id: 1})` |
| `$store` | Access global Alpine store | `$store.cart.count` |

**x-show vs x-if:**
- `x-show` — element stays in the DOM, just hidden with CSS. Faster to toggle.
- `x-if` — element is removed/added from DOM. Use for things rarely shown.

**`Alpine.data()` pattern (reusable components):**
```js
Alpine.data('storeSelector', () => ({
    stores: [],
    selected: null,
    init() { /* runs on load */ },
    selectStore(id) { this.selected = id; }
}));
```
Then in HTML: `x-data="storeSelector()"`

**Test yourself:** You have a dropdown menu. Should you use `x-show` or `x-if` to toggle it? Why?

---

## Point 12 — TailwindCSS in Hyvä

**What it is:**
TailwindCSS is a CSS framework where you style elements directly in HTML using small utility classes instead of writing custom CSS files.

**Analogy:**
Normal CSS: you write a CSS class `.big-red-button` and style it separately. Tailwind: you write `class="bg-red-500 text-white px-4 py-2 rounded"` directly on the element.

**Example:**
```html
<!-- Without Tailwind -->
<button class="my-button">Buy Now</button>
<!-- You need a separate CSS file with .my-button styles -->

<!-- With Tailwind -->
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
    Buy Now
</button>
<!-- All styling is right there in the HTML -->
```

**Key facts:**
- Config file location in Hyvä: `app/design/frontend/Vendor/Theme/web/tailwind/tailwind.config.js`
- Tailwind only includes CSS classes you actually use (small final file size)
- You run `npm run build` to compile Tailwind CSS
- Common classes: `flex`, `grid`, `hidden`, `block`, `text-lg`, `font-bold`, `mt-4`, `px-6`

**In Hyvä project workflow:**
1. Write HTML with Tailwind classes in `.phtml` templates
2. Run `npm run build` in the tailwind folder
3. Magento serves the compiled CSS

**Test yourself:** Where is the Tailwind config file in a Hyvä project?

---

## Point 13 — B2B vs B2C in Magento

**What it is:**
- **B2C** (Business to Consumer) = regular online store. One customer, one cart, standard pricing.
- **B2B** (Business to Business) = companies buy from companies. Multiple users per account, custom pricing, approval workflows.

**Analogy:**
B2C is like Amazon — anyone can buy at the same price. B2B is like a wholesale supplier — "Company X gets 20% off because they buy 1000 units/month, and purchases over $5000 need manager approval."

**B2B-specific Magento modules:**
| Module | What it does |
|--------|-------------|
| `Magento_Company` | Company accounts with multiple users + roles |
| `Magento_SharedCatalog` | Show different products/prices per company |
| `Magento_NegotiableQuote` | Sales rep negotiates price with a buyer |
| `Magento_PurchaseOrder` | Orders need approval before payment |
| `Magento_Requisition` | Save shopping lists for repeat orders |
| `Magento_QuickOrder` | Order by SKU (for buyers who know their products) |

**Your real B2B project — Sports Group Denmark:**
- Danish sports equipment company
- Built full B2B storefront with Hyvä
- Post-login store selector (custom module)
- Product listing page from scratch (grid/list toggle)
- Customer account area (orders, profile, addresses)
- Amasty ShopBy filtering
- Auth flows (login, register, forgot password)
- 11 tickets total, 3 custom modules

**Test yourself:** What is a Negotiable Quote and why do B2B companies need it?

---

## Point 14 — Your Project Stories

**You have 4 projects to talk about. Here's each one in 3 sentences:**

### Sports Group Denmark (Your strongest B2B example)
"I built a full B2B storefront for a Danish sports equipment company using Magento 2 and Hyvä. I worked on 11 tickets including a PLP from scratch with grid/list toggle, a post-login store selector module, customer account area, and Amasty ShopBy filtering. This gave me strong experience in Hyvä theme development with Alpine.js and TailwindCSS, plus custom module development."

### Gemoss (Full storefront)
"I built a full B2C storefront with 20 tickets. Key work included Algolia search integration with autocomplete, a full product listing page with quick-shop modal, subcategory carousel, and hero slider via Page Builder. I also set up Amasty Shop By Brand for brand filtering."

### Satoshi Hyvä Theme (Open source)
"I contributed to an open-source Hyvä theme used as a base by other Scandiweb projects. It was built with Alpine.js, TypeScript, and TailwindCSS. This deepened my understanding of how Hyvä themes are architected from the ground up."

### J.R. Dunn (Team lead)
"I was the frontend team lead for a Magento 1 to Shopify migration. I ran daily syncs with junior developers and coordinated with senior devs. This gave me experience managing a frontend team and owning delivery."

**Key numbers to remember:**
- SGD: 11 tickets, 3 custom modules
- Gemoss: 20 tickets
- Total experience: ~2 years at Scandiweb

**Test yourself:** Tell me about your strongest project in 3-4 sentences (without reading the notes above).

---

## Point 15 — GCP & Cloudflare

**GCP (Google Cloud Platform) — What you use:**

| Service | What it does for Magento |
|---------|------------------------|
| Compute Engine | VM (server) that runs Nginx + PHP + Magento |
| Cloud SQL | Managed MySQL database |
| Cloud Storage | Stores product images, media files |
| Cloud CDN | Caches static files globally (fast delivery) |
| Load Balancer | Splits traffic across multiple VMs |
| IAM | Controls who can access what (permissions) |

**Full stack diagram:**
```
Cloudflare (WAF + CDN + DDoS protection)
    ↓
GCP Load Balancer
    ↓
Compute Engine VM
    ├── Nginx
    ├── PHP-FPM
    ├── Redis (cache + sessions)
    └── Elasticsearch (search)
    ↓
Cloud SQL (MySQL)
Cloud Storage (media)
```

**Cloudflare — What it does:**
- **CDN** — Caches your site globally so pages load fast everywhere
- **WAF** (Web Application Firewall) — Blocks hackers, SQL injection attempts
- **DDoS protection** — Absorbs attack traffic before it hits your server
- **SSL/TLS** — Free HTTPS certificates
- **Bot management** — Blocks scrapers and bad bots
- **Cache rules** — "Cache product images, but never cache checkout pages"

**Test yourself:** Why would you add a Cloudflare cache rule to bypass caching for `/checkout`?

---

## Point 16 — Security

**OWASP Top 10 — The main web attack types:**

| Attack | What it is | How Magento handles it |
|--------|-----------|----------------------|
| SQL Injection | Attacker puts SQL code in a form field to read/delete your DB | Magento uses ORM (never raw SQL) |
| XSS (Cross-Site Scripting) | Attacker injects JavaScript into your page | Magento escapes all output (`$block->escapeHtml()`) |
| CSRF | Tricks user's browser into making requests they didn't intend | Magento uses form keys (tokens) on all forms |
| Broken Auth | Weak passwords, no 2FA | Enforce strong passwords + 2FA in admin |
| Data Exposure | Sensitive data not encrypted | HTTPS always, never store card numbers |

**Magento Security Checklist:**
- Change admin URL from `/admin` to something random (`/secretadmin2024`)
- Enable 2FA for admin
- Restrict admin access by IP
- HTTPS only (no HTTP)
- Correct file permissions (664 for files, 775 for directories)
- Hide Magento version from public
- WAF rules in Cloudflare
- Regular backups (DB + media)
- Use hosted payment gateways (Stripe, Paymob) — never store card numbers yourself
- Subscribe to Magento security patches

**PCI DSS (Payment Card Industry):**
- Rules you must follow if you handle credit cards
- Easiest approach: use a hosted gateway (Stripe, Paymob) — they handle card data, not you

**GDPR:**
- EU law about user data privacy
- Must have: cookie consent, ability to delete account data, opt-in for emails

**Test yourself:** Why is it important to change the default `/admin` URL?

---

## Quick Reference — CLI Commands

```bash
bin/magento setup:upgrade              # apply DB patches + module updates
bin/magento cache:flush                # clear all cache
bin/magento setup:di:compile           # compile dependency injection
bin/magento module:enable Vendor_Name  # enable a module
bin/magento module:disable Vendor_Name # disable a module
bin/magento indexer:reindex            # rebuild search/category indexes
bin/magento deploy:mode:set production # switch to production mode
```

**When to run what:**
- Added new module → `module:enable` + `setup:upgrade` + `cache:flush`
- Changed di.xml / plugins → `setup:di:compile` + `cache:flush`
- Changed templates/CSS → `cache:flush` (sometimes `setup:static-content:deploy`)

---

## Progress Tracker

- [ ] Point 1 — What is Magento 2?
- [ ] Point 2 — Module Structure
- [ ] Point 3 — MVC Architecture
- [ ] Point 4 — Layout XML
- [ ] Point 5 — Plugins
- [ ] Point 6 — Events & Observers
- [ ] Point 7 — Dependency Injection
- [ ] Point 8 — Data Patches
- [ ] Point 9 — EAV Model
- [ ] Point 10 — What is Hyvä?
- [ ] Point 11 — Alpine.js
- [ ] Point 12 — TailwindCSS
- [ ] Point 13 — B2B vs B2C
- [ ] Point 14 — Your Project Stories
- [ ] Point 15 — GCP & Cloudflare
- [ ] Point 16 — Security
