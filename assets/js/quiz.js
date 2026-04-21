// ── Categories ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',         label: 'All Topics',      icon: '📚', color: 'cat-all' },
  { id: 'magento',     label: 'Magento Core',     icon: '🧱', color: 'cat-magento' },
  { id: 'hyva',        label: 'Hyva Theme',       icon: '⚡', color: 'cat-hyva' },
  { id: 'b2b',         label: 'B2B / B2C',        icon: '🏢', color: 'cat-b2b' },
  { id: 'performance', label: 'Performance',      icon: '🚀', color: 'cat-perf' },
  { id: 'api',         label: 'REST & GraphQL',   icon: '🔌', color: 'cat-api' },
  { id: 'security',    label: 'Security',         icon: '🔒', color: 'cat-sec' },
  { id: 'infra',       label: 'GCP & Cloudflare', icon: '☁️', color: 'cat-infra' },
];

// ── Questions ─────────────────────────────────────────────────────────────────

const QUESTIONS = [

  // ── MAGENTO CORE ─────────────────────────────────────────────────────────────

  {
    category: 'magento',
    q: 'What command do you run after creating a new module to register it?',
    options: [
      'bin/magento cache:flush',
      'bin/magento setup:upgrade',
      'bin/magento module:enable Vendor_Name',
      'bin/magento setup:di:compile'
    ],
    answer: 1,
    explain: 'setup:upgrade registers new modules and runs data/schema patches. Always run it after adding a new module or installing an extension, then flush the cache.'
  },
  {
    category: 'magento',
    q: 'Where does your custom module code live in Magento?',
    options: [
      'vendor/Vendor/Module',
      'app/code/Vendor/Module',
      'app/design/Vendor/Module',
      'lib/internal/Vendor/Module'
    ],
    answer: 1,
    explain: 'Custom modules go under app/code/Vendor/ModuleName. The vendor/ folder is for Composer-installed packages — never edit files there.'
  },
  {
    category: 'magento',
    q: 'Which file is required to tell Magento that your module exists?',
    options: [
      'module.xml',
      'di.xml',
      'registration.php',
      'config.xml'
    ],
    answer: 2,
    explain: 'registration.php calls ComponentRegistrar::register() to tell Magento where the module lives. Without it, the module is completely ignored.'
  },
  {
    category: 'magento',
    q: 'What is a Plugin (Interceptor) in Magento?',
    options: [
      'A third-party extension from the Magento Marketplace',
      'A way to run code before, after, or around any public method without editing the original class',
      'A CSS and JS bundle injected into the page',
      'A special type of Magento event observer'
    ],
    answer: 1,
    explain: 'Plugins intercept any public method in Magento. You register them in di.xml with a type and plugin name. The original class is never touched, so upgrades stay safe.'
  },
  {
    category: 'magento',
    q: 'Which plugin type can prevent the original method from running entirely?',
    options: [
      'before',
      'after',
      'around',
      'override'
    ],
    answer: 2,
    explain: 'An around plugin wraps the original method. By not calling $proceed(), you skip the original entirely. Use it rarely — it blocks other plugins stacking cleanly and is hard to debug.'
  },
  {
    category: 'magento',
    q: 'What can a before plugin do that an after plugin cannot?',
    options: [
      'Modify the return value of the method',
      'Modify the input arguments before the method runs',
      'Prevent the method from running',
      'Register a new observer'
    ],
    answer: 1,
    explain: 'A before plugin can modify the input arguments (returned as an array). An after plugin gets the result and can modify the return value. Neither can do the other job.'
  },
  {
    category: 'magento',
    q: 'What is an Observer in Magento?',
    options: [
      'A tool that watches server performance metrics',
      'A class that listens to events Magento fires — like "order placed" or "product saved"',
      'A type of layout XML block',
      'A module that monitors product inventory'
    ],
    answer: 1,
    explain: 'Observers are subscribed to events in events.xml. When Magento fires the named event, your Observer class execute() method runs automatically.'
  },
  {
    category: 'magento',
    q: 'When should you use an Observer instead of a Plugin?',
    options: [
      'When you need to modify a method return value',
      'When Magento already fires an event at the exact moment you need to react',
      'When you are working on the admin area only',
      'When the plugin approach would be too slow'
    ],
    answer: 1,
    explain: 'Use an Observer when Magento fires an event at the right moment and you just need to react. Use a Plugin when you need to intercept a specific method and change its inputs or output.'
  },
  {
    category: 'magento',
    q: 'What does Dependency Injection (DI) mean in Magento?',
    options: [
      'A tool for importing data into the database',
      'A pattern where classes declare what they need in the constructor, and Magento creates and injects those dependencies automatically',
      'A way to deploy code to different server environments',
      'A config file for setting admin user permissions'
    ],
    answer: 1,
    explain: 'With DI you never write "new ClassName()". Instead, type-hint what you need in the constructor and Magento Object Manager provides it. This keeps code testable and loosely coupled.'
  },
  {
    category: 'magento',
    q: 'In Magento DI, you should always inject...',
    options: [
      'Concrete classes like ProductRepository',
      'Helper classes only',
      'Interfaces like ProductRepositoryInterface',
      'Model classes directly'
    ],
    answer: 2,
    explain: 'Always inject interfaces. If you want to swap the implementation (for example, replacing Magento search with Algolia), you just change a preference in di.xml — no code changes needed.'
  },
  {
    category: 'magento',
    q: 'What is a Data Patch used for?',
    options: [
      'Patching security vulnerabilities in Magento core',
      'Inserting or updating database records (CMS blocks, config values, attributes) as part of a module',
      'Updating product prices in bulk via the admin panel',
      'Fixing broken .phtml template files'
    ],
    answer: 1,
    explain: 'Data Patches run once via setup:upgrade and are tracked in the patch_list table so they never run twice. Use them to seed CMS blocks, configuration, or product attributes.'
  },
  {
    category: 'magento',
    q: 'A Data Patch was deployed to production and has a bug. What is the correct fix?',
    options: [
      'Edit the original patch file and run bin/magento setup:upgrade again',
      'Delete the patch record from patch_list and re-run',
      'Create a new patch that depends on the original and corrects the data',
      'Manually fix the database and leave the patch file unchanged'
    ],
    answer: 2,
    explain: 'Never modify a deployed patch — it is already recorded as done in every environment. Create a new patch with getDependencies() pointing to the original. The new patch will run for everyone.'
  },
  {
    category: 'magento',
    q: 'What does a Layout XML file control?',
    options: [
      'The database table structure for the page',
      'The CSS styling applied to each page',
      'Which blocks appear on which page, in which containers, and in what order',
      'The JavaScript modules loaded on the page'
    ],
    answer: 2,
    explain: 'Layout XML is the page blueprint. Files like catalog_product_view.xml declare which PHP blocks to render in which containers. Blocks are added, removed, or moved entirely in XML without touching PHP.'
  },
  {
    category: 'magento',
    q: 'Which layout handle runs on EVERY page in Magento?',
    options: [
      'catalog_product_view.xml',
      'default.xml',
      'index.xml',
      'base.xml'
    ],
    answer: 1,
    explain: 'default.xml runs for every page. Use specific handles for targeted changes. Anything added in default.xml appears site-wide, so be careful what you add there.'
  },
  {
    category: 'magento',
    q: 'What is EAV in Magento?',
    options: [
      'External API Validation — a way to validate third-party API responses',
      'Entity-Attribute-Value — a flexible data storage model for product attributes',
      'Event-Action-View — the Magento request lifecycle pattern',
      'Extension Attribute Variables — custom fields added to API responses'
    ],
    answer: 1,
    explain: 'EAV stores attribute values in separate rows instead of columns, allowing unlimited custom attributes without schema changes. The downside is slower queries due to many table joins.'
  },
  {
    category: 'magento',
    q: 'What is a ViewModel in Magento?',
    options: [
      'The database model for storing view-layer data',
      'A PHP class that prepares data for templates — the modern replacement for putting logic in Block classes',
      'A JavaScript component used in the Hyva theme',
      'A special layout XML block with conditional rendering'
    ],
    answer: 1,
    explain: 'ViewModels implement ArgumentInterface and hold the PHP logic that templates need. They are injected via Layout XML arguments, keeping templates clean and making logic easy to unit test.'
  },
  {
    category: 'magento',
    q: 'What command pre-generates the Dependency Injection configuration for production?',
    options: [
      'bin/magento cache:flush',
      'bin/magento setup:upgrade',
      'bin/magento setup:di:compile',
      'bin/magento indexer:reindex'
    ],
    answer: 2,
    explain: 'setup:di:compile generates all DI configuration, proxy classes, and interceptors. It is required in production mode for performance and must be re-run whenever you change di.xml or add plugins.'
  },

  // ── HYVA THEME ───────────────────────────────────────────────────────────────

  {
    category: 'hyva',
    q: 'What does Hyva Theme replace in Magento default Luma theme?',
    options: [
      'PHP and the MySQL database layer',
      'RequireJS, KnockoutJS, and Bootstrap CSS',
      'Nginx and Apache web servers',
      'Redis cache and Elasticsearch search'
    ],
    answer: 1,
    explain: 'Hyva replaces the entire Luma JS/CSS stack: no RequireJS module loader, no KnockoutJS data binding, no Bootstrap. Replaced with Alpine.js for JS and TailwindCSS for styling.'
  },
  {
    category: 'hyva',
    q: 'What JavaScript framework does Hyva use?',
    options: [
      'React',
      'Vue.js',
      'KnockoutJS',
      'Alpine.js'
    ],
    answer: 3,
    explain: 'Hyva uses Alpine.js — a lightweight (~7KB) framework with declarative x- attributes written directly in HTML. No separate component files, no build pipeline required just for JS.'
  },
  {
    category: 'hyva',
    q: 'What is the typical JavaScript bundle size comparison between Hyva and Luma?',
    options: [
      '800KB+ (Hyva) vs ~40KB (Luma)',
      '~40KB (Hyva) vs 800KB+ (Luma)',
      'Both are around 200KB in production',
      '200KB (Hyva) vs 400KB (Luma)'
    ],
    answer: 1,
    explain: 'Hyva ships roughly 40KB of JS. Luma ships 800KB to 1.2MB. That is a 20x reduction, which dramatically improves page load time and Core Web Vitals scores.'
  },
  {
    category: 'hyva',
    q: 'What Google Lighthouse score improvement does Hyva typically deliver over Luma?',
    options: [
      'From 70-80 to 90+',
      'From 30-50 to 90+',
      'From 50-60 to 70-75',
      'Hyva does not meaningfully affect Lighthouse scores'
    ],
    answer: 1,
    explain: 'Luma-based stores typically score 30-50 on mobile Lighthouse. Hyva stores regularly score 85-100. This directly impacts Google SEO rankings and customer conversion rates.'
  },
  {
    category: 'hyva',
    q: 'What does the Alpine.js directive x-data do?',
    options: [
      'Fetches data from a remote API endpoint automatically',
      'Declares reactive state for a component — like variables that trigger re-renders when they change',
      'Dynamically binds a CSS class to an element',
      'Loops over an array and renders repeated HTML elements'
    ],
    answer: 1,
    explain: 'x-data="{ count: 0, isOpen: false }" declares the component state. Every other Alpine directive within that element can read and update this state, and the DOM updates automatically.'
  },
  {
    category: 'hyva',
    q: 'What is the difference between x-show and x-if in Alpine.js?',
    options: [
      'x-show is faster; x-if is more accurate for complex conditions',
      'x-show toggles visibility with CSS display:none (element stays in DOM); x-if removes the element from the DOM entirely',
      'x-show works only on block elements; x-if works on inline elements',
      'There is no practical difference between them'
    ],
    answer: 1,
    explain: 'x-show uses display:none — the element stays in the DOM (good for frequent toggling). x-if removes and re-adds the element (good for elements that rarely appear, saves DOM nodes).'
  },
  {
    category: 'hyva',
    q: 'What does $dispatch("add-to-cart", { sku: "ABC" }) do in Alpine.js?',
    options: [
      'Sends an HTTP POST request to the Magento cart API',
      'Fires a custom DOM event that bubbles up so other components or JS listeners can react to it',
      'Dispatches a job to the Magento message queue',
      'Logs cart data to the browser developer console'
    ],
    answer: 1,
    explain: '$dispatch fires a custom DOM event on the current element. It bubbles up the DOM tree. Other Alpine components or plain JS listeners (window.addEventListener) can react to it. Used heavily in Hyva for cross-component communication.'
  },
  {
    category: 'hyva',
    q: 'What is x-cloak used for in Alpine.js?',
    options: [
      'To hide sensitive payment data from the page source',
      'To prevent a flash of un-initialized content before Alpine.js has loaded and processed the element',
      'To encrypt component state before storing in localStorage',
      'To block click events from bubbling up the DOM'
    ],
    answer: 1,
    explain: 'Add [x-cloak] { display: none } to your CSS. Alpine removes the x-cloak attribute when it initializes the element. Without it, users briefly see raw un-processed Alpine markup before JS loads.'
  },
  {
    category: 'hyva',
    q: 'In Hyva, how do you override a Magento core .phtml template?',
    options: [
      'Edit the file directly in vendor/ and run setup:upgrade',
      'Place a file with the same relative path in your theme under app/design/frontend/ — Magento fallback picks yours first',
      'Override it in app/code/ and register a preference in di.xml',
      'Use an around plugin to intercept the template rendering method'
    ],
    answer: 1,
    explain: 'Magento template fallback order: Your theme → Parent theme → Module. Put a .phtml at the same path in your theme (e.g. Magento_Catalog/templates/product/view/default.phtml) and Magento uses yours first.'
  },
  {
    category: 'hyva',
    q: 'What does Alpine.data("myComponent", () => ({...})) allow you to do?',
    options: [
      'Create a global Magento configuration variable accessible in PHP',
      'Define a named reusable Alpine component that any template can use with x-data="myComponent()"',
      'Import data from an external API automatically on page load',
      'Register a new TailwindCSS utility class dynamically'
    ],
    answer: 1,
    explain: 'Alpine.data() registers a named component with state and methods. Any element can then use x-data="myComponent()" to get the full functionality. This is the primary way to share logic across multiple Hyva templates.'
  },
  {
    category: 'hyva',
    q: 'Where is the TailwindCSS config file located in a Hyva theme?',
    options: [
      'app/code/Vendor/Theme/tailwind.config.js',
      'app/design/frontend/Vendor/Theme/web/tailwind/tailwind.config.js',
      'pub/static/tailwind.config.js',
      'vendor/hyva-themes/tailwind.config.js'
    ],
    answer: 1,
    explain: 'The Tailwind config lives at app/design/frontend/Vendor/Theme/web/tailwind/tailwind.config.js. Check this first on any new Hyva project — it defines project colors, fonts, and custom values.'
  },

  // ── B2B / B2C ────────────────────────────────────────────────────────────────

  {
    category: 'b2b',
    q: 'What is the core difference between a B2C and a B2B customer in Magento?',
    options: [
      'B2B customers always pay higher prices than B2C',
      'B2B customers are companies with multiple users and roles, not just individual people',
      'B2B uses a completely separate Magento installation from B2C',
      'B2B customers can only buy specific product types'
    ],
    answer: 1,
    explain: 'B2C = one person buys. B2B = a company buys, with multiple employees, roles (buyer, approver, admin), custom pricing, and approval workflows. The whole customer model is different.'
  },
  {
    category: 'b2b',
    q: 'Which Magento module manages company accounts and user roles in B2B?',
    options: [
      'Magento_B2B',
      'Magento_Company',
      'Magento_Corporate',
      'Magento_CustomerGroup'
    ],
    answer: 1,
    explain: 'Magento_Company is the core B2B module. It enables company accounts, assigns users to companies, and manages roles (company admin, buyer, etc.) with different permission levels.'
  },
  {
    category: 'b2b',
    q: 'What does the Magento Shared Catalog feature do?',
    options: [
      'Makes the entire product catalog visible publicly without login',
      'Lets you assign specific products and prices to specific companies — Company A sees different products and prices than Company B',
      'Shares one product catalog across multiple Magento store views',
      'Creates a public REST API endpoint for catalog data'
    ],
    answer: 1,
    explain: 'Shared Catalogs (Magento_SharedCatalog) give you fine-grained control over which products and at what prices each company can see. Essential for wholesale and distributor models.'
  },
  {
    category: 'b2b',
    q: 'What is a Negotiable Quote in Magento B2B?',
    options: [
      'A fixed percentage discount shown on product pages',
      'A feature where a buyer requests a custom quote and a sales rep negotiates the final price before the order is placed',
      'An automatic bulk discount applied at checkout based on cart total',
      'A Cloudflare cache rule that expires after a set time'
    ],
    answer: 1,
    explain: 'Negotiable Quotes (Magento_NegotiableQuote) implement the classic B2B "request a quote" workflow. The buyer submits a quote, the sales rep adjusts prices, and both sides negotiate before the final order.'
  },
  {
    category: 'b2b',
    q: 'What does the Magento_PurchaseOrder module enable?',
    options: [
      'Automatic stock reorder when inventory runs low',
      'Order approval workflows where a manager must approve orders above a set limit before payment is processed',
      'PayPal purchase order payment method integration',
      'Bulk product importing via CSV file upload'
    ],
    answer: 1,
    explain: 'Magento_PurchaseOrder implements approval flows. Large orders (or all orders) get routed to a manager for approval before payment. This is standard in enterprise B2B purchasing.'
  },
  {
    category: 'b2b',
    q: 'How does B2B pricing typically differ from B2C pricing in Magento?',
    options: [
      'B2B pricing is always lower than B2C across the board',
      'All customers see the same price in both B2B and B2C',
      'B2B companies can have custom prices per company, tier pricing for bulk orders, and negotiated rates',
      'B2B prices are set by the customer during checkout'
    ],
    answer: 2,
    explain: 'B2B pricing is highly flexible: customer group prices, tier pricing (buy 100+ units get 15% off), negotiated quotes per company, and shared catalog prices that differ per company. One-size-fits-all pricing is rare in B2B.'
  },

  // ── PERFORMANCE ──────────────────────────────────────────────────────────────

  {
    category: 'performance',
    q: 'What is Magento Full Page Cache (FPC) used for?',
    options: [
      'Caching all MySQL database queries to speed up the database',
      'Storing the complete rendered HTML of pages so Magento does not rebuild them for every anonymous visitor',
      'Saving customer session data between page visits',
      'Caching product images for faster CDN delivery'
    ],
    answer: 1,
    explain: 'FPC stores the full HTML output of pages. When an anonymous user visits a cached page, Magento serves the saved HTML instead of running PHP and MySQL for every request. Huge performance win for high-traffic pages.'
  },
  {
    category: 'performance',
    q: 'What is Redis used for in a Magento production setup?',
    options: [
      'As a complete replacement for MySQL to store all product data',
      'As a fast in-memory store for application cache and customer sessions',
      'As a full-text search engine for product and category search',
      'As a message queue processor for background jobs only'
    ],
    answer: 1,
    explain: 'Redis is an in-memory key-value store. In Magento it replaces the default file-based cache (much faster) and stores session data. It can also back the full page cache.'
  },
  {
    category: 'performance',
    q: 'What is the role of Elasticsearch or OpenSearch in Magento?',
    options: [
      'To replace MySQL as the primary product database',
      'To index product data and power fast, relevant, typo-tolerant search results',
      'To cache static files like images and CSS for faster delivery',
      'To process background jobs and outgoing emails'
    ],
    answer: 1,
    explain: 'Magento default MySQL search is slow. Elasticsearch/OpenSearch indexes all product data and handles search with relevance ranking. It is required for Magento 2.4+.'
  },
  {
    category: 'performance',
    q: 'Why does Hyva improve Magento page speed so dramatically compared to Luma?',
    options: [
      'Hyva uses a faster custom version of PHP',
      'Hyva removes the huge RequireJS plus KnockoutJS bundle (~800KB) and replaces it with Alpine.js (~40KB)',
      'Hyva bypasses the Magento full page cache for faster rendering',
      'Hyva directly rewrites MySQL queries to run faster'
    ],
    answer: 1,
    explain: 'The main gain is a 20x reduction in JavaScript. Luma sends 800KB+ of JS that must download and parse before the page is interactive. Hyva sends roughly 40KB. Combined with TailwindCSS purging unused styles, every metric improves.'
  },

  // ── REST & GRAPHQL ───────────────────────────────────────────────────────────

  {
    category: 'api',
    q: 'What is the key difference between Magento REST API and GraphQL in terms of data returned?',
    options: [
      'REST returns less data; GraphQL always returns every field',
      'REST returns the full object for every request; GraphQL returns only the specific fields you ask for',
      'Both APIs return exactly the same data in different formats',
      'REST returns JSON; GraphQL returns XML'
    ],
    answer: 1,
    explain: 'This is GraphQL main advantage: you specify exactly which fields you need in the query. REST always returns the full object. For a mobile app that only needs product name and price, GraphQL is far more efficient.'
  },
  {
    category: 'api',
    q: 'Which API type is better suited for a React or Vue PWA headless frontend?',
    options: [
      'REST API — it is simpler and more widely supported',
      'GraphQL API — it lets the frontend request exactly what it needs in one call',
      'SOAP API — it has the most features',
      'Both are equally good for headless frontends'
    ],
    answer: 1,
    explain: 'GraphQL is designed for frontend-driven applications. You can fetch a product with its reviews, related products, and images all in one query with exactly the fields you need. Perfect for PWAs and mobile apps.'
  },
  {
    category: 'api',
    q: 'What is the correct URL pattern for Magento REST API?',
    options: [
      '/api/v1/products',
      '/rest/V1/products',
      '/magento/rest/products',
      '/v1/catalog/products'
    ],
    answer: 1,
    explain: 'Magento REST API follows /rest/V1/[resource]. Examples: GET /rest/V1/products/SKU001, POST /rest/V1/orders, GET /rest/V1/customers/me. The V1 version segment is always capitalized.'
  },
  {
    category: 'api',
    q: 'When would you choose REST API over GraphQL in Magento?',
    options: [
      'When building a React or Vue frontend application',
      'For server-to-server integrations like ERP systems, logistics APIs, or backend admin scripts',
      'REST always has better performance than GraphQL',
      'When you need to fetch nested related data in a single request'
    ],
    answer: 1,
    explain: 'REST is ideal for backend-to-backend integrations: syncing orders to an ERP, pushing inventory updates, or running admin scripts. It is simpler for straightforward CRUD that does not need flexible field selection.'
  },

  // ── SECURITY ─────────────────────────────────────────────────────────────────

  {
    category: 'security',
    q: 'What OWASP vulnerability occurs when user input is concatenated directly into a SQL query string?',
    options: [
      'XSS (Cross-Site Scripting)',
      'CSRF (Cross-Site Request Forgery)',
      'SQL Injection',
      'Broken Authentication'
    ],
    answer: 2,
    explain: 'SQL Injection lets attackers manipulate database queries to read or destroy data. In Magento, always use the ORM (collections, repositories) which parameterizes queries automatically. Never build raw SQL strings from user input.'
  },
  {
    category: 'security',
    q: 'What Magento function should you use to safely output user-provided text in a .phtml template?',
    options: [
      'htmlspecialchars($text)',
      'strip_tags($text)',
      '$block->escapeHtml($text)',
      'sanitize($text)'
    ],
    answer: 2,
    explain: '$block->escapeHtml() is Magento built-in XSS prevention. It converts special characters like < > " into safe HTML entities. Also use escapeUrl() for URLs, escapeJs() for JS contexts, and escapeHtmlAttr() for HTML attributes.'
  },
  {
    category: 'security',
    q: 'What does CSRF protection in Magento do?',
    options: [
      'Blocks IP addresses that make too many requests per minute',
      'Adds a secret token to forms that prevents a malicious external site from tricking a logged-in user into submitting fake requests',
      'Validates SSL certificate chains on form submissions',
      'Rate-limits all API requests automatically'
    ],
    answer: 1,
    explain: 'Magento adds a form_key (CSRF token) to all forms automatically. Before processing, it verifies the key matches the session. If you build a custom form, verify you include and check the form_key.'
  },
  {
    category: 'security',
    q: 'Why should you use a hosted payment gateway instead of processing credit card data yourself?',
    options: [
      'Hosted gateways always have lower transaction fees',
      'Card data never touches your server, which dramatically reduces your PCI DSS compliance scope',
      'It is faster and easier to build',
      'Customers trust entering card details into third-party iframes more'
    ],
    answer: 1,
    explain: 'Full PCI DSS compliance is extremely costly when you store or process card data. With hosted gateways (Stripe, PayPal, Paymob), card data goes directly to the provider — your server only receives a token. Much safer and legally simpler.'
  },
  {
    category: 'security',
    q: 'What is the most important first security step for a new Magento admin panel?',
    options: [
      'Change the default admin email address',
      'Change the admin URL from /admin to a custom path like /backend-xyz123',
      'Install an SSL certificate on the server',
      'Enable Redis caching'
    ],
    answer: 1,
    explain: 'The default /admin URL is a well-known attack target. Bots constantly scan for it and attempt credential stuffing. Changing it to something custom like /store-admin-2024 immediately removes this attack surface.'
  },
  {
    category: 'security',
    q: 'What does running bin/magento deploy:mode:set production do?',
    options: [
      'Deploys your code to the production server via SSH',
      'Enables production mode which hides detailed error messages, enables full caching, and activates performance optimizations',
      'Creates an automated production database backup',
      'Only merges and minifies CSS and JS files'
    ],
    answer: 1,
    explain: 'Production mode is essential before going live. It hides stack traces (which expose code structure to attackers), pre-generates DI, merges CSS/JS, and enables all caching. Developer mode must never run on a live site.'
  },
  {
    category: 'security',
    q: 'What does GDPR require from an e-commerce store selling to European customers?',
    options: [
      'Only that customer passwords are stored as bcrypt hashes',
      'Only that HTTPS is enabled on all pages',
      'Cookie consent notice, the ability to delete customer data on request, and explicit opt-in for marketing emails',
      'That all customer data is physically stored on servers inside Europe'
    ],
    answer: 2,
    explain: 'GDPR key requirements: inform users about cookies and get consent, allow data deletion requests, document what data you collect and why, and never send marketing emails without explicit opt-in. Violating GDPR carries large fines.'
  },

  // ── GCP & CLOUDFLARE ─────────────────────────────────────────────────────────

  {
    category: 'infra',
    q: 'Which GCP service would you use to run the Magento PHP and Nginx web server?',
    options: [
      'Cloud Storage',
      'Cloud SQL',
      'Compute Engine',
      'Cloud Functions'
    ],
    answer: 2,
    explain: 'Compute Engine is GCP virtual machine service. You provision a Linux VM, install Nginx, PHP-FPM, and Redis, then deploy Magento. It is the equivalent of a rented dedicated server you fully control.'
  },
  {
    category: 'infra',
    q: 'What is Google Cloud SQL?',
    options: [
      'A web-based SQL query editor built into GCP',
      'A managed MySQL or PostgreSQL database where Google handles backups, security patches, and failover automatically',
      'A data warehouse service for analytics and reporting',
      'A tool for migrating databases between cloud regions'
    ],
    answer: 1,
    explain: 'Cloud SQL is fully managed. Google handles automated backups, security patches, and high-availability failover. For Magento, you point your database config at Cloud SQL instead of managing MySQL yourself.'
  },
  {
    category: 'infra',
    q: 'Which Cloudflare feature blocks SQL injection and XSS attacks before they reach Magento?',
    options: [
      'CDN (Content Delivery Network)',
      'DDoS Protection',
      'WAF (Web Application Firewall)',
      'SSL/TLS termination'
    ],
    answer: 2,
    explain: 'Cloudflare WAF inspects every incoming request and matches it against patterns for known attack types. It can block SQL injection, XSS, and known Magento exploit attempts before the request ever reaches your PHP server.'
  },
  {
    category: 'infra',
    q: 'For which Magento pages should Cloudflare caching be bypassed?',
    options: [
      'Product listing pages and category pages',
      'Cart, checkout, and customer account pages',
      'Homepage and CMS static pages',
      'All pages — Cloudflare should not cache any Magento pages'
    ],
    answer: 1,
    explain: 'Cart, checkout, and customer account pages are personalized per user. If Cloudflare caches them, the wrong customer data gets served to other users. Set Page Rules to bypass cache for /checkout/*, /customer/*, and /cart.'
  },
  {
    category: 'infra',
    q: 'What does Cloudflare CDN do for your store?',
    options: [
      'It protects your origin server from DDoS attacks',
      'It caches static files (images, CSS, JS) on edge servers near users so they load fast globally without hitting your origin server',
      'It automatically renews SSL certificates',
      'It scans all user-uploaded files for malware'
    ],
    answer: 1,
    explain: 'A CDN has hundreds of edge servers worldwide. When a user loads your page, static files are served from the nearest edge node — not from your GCP origin server. This dramatically reduces latency for global users.'
  },
  {
    category: 'infra',
    q: 'What does GCP IAM stand for and what is its purpose?',
    options: [
      'Infrastructure And Monitoring — tracks server CPU and memory metrics',
      'Identity and Access Management — controls which users and service accounts can access which GCP resources',
      'Internal Application Manager — manages Magento settings remotely',
      'Integrated API Module — connects GCP services to each other'
    ],
    answer: 1,
    explain: 'IAM implements the least-privilege principle on GCP. Your Magento server should only have the permissions it actually needs: read/write Cloud Storage, connect to Cloud SQL. Nothing more. This limits damage if the server is compromised.'
  },
  {
    category: 'infra',
    q: 'What is the role of GCP Cloud Load Balancing in a Magento production setup?',
    options: [
      'To balance MySQL query load across multiple database tables',
      'To distribute incoming HTTP traffic across multiple server VMs and handle SSL termination',
      'To balance file storage between Cloud SQL and Cloud Storage buckets',
      'To manage team member access permissions in IAM'
    ],
    answer: 1,
    explain: 'Cloud Load Balancing routes user requests across multiple Compute Engine VMs. When traffic spikes, more VMs can be added without downtime. It also handles SSL termination so individual VMs do not need to manage certificates.'
  },

];

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  activeCategory: 'all',
  questions: [],
  index: 0,
  score: 0,
  results: [],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepareQuestion(q) {
  const indexed = q.options.map((opt, i) => ({ opt, isAnswer: i === q.answer }));
  const shuffled = shuffle(indexed);
  return { ...q, options: shuffled.map(x => x.opt), answer: shuffled.findIndex(x => x.isAnswer) };
}

function show(id) {
  ['start-screen', 'quiz-screen', 'result-screen'].forEach(s => {
    document.getElementById(s).style.display = s === id ? '' : 'none';
  });
}

// ── Start screen ──────────────────────────────────────────────────────────────

function renderCategories() {
  const catCounts = {};
  QUESTIONS.forEach(q => { catCounts[q.category] = (catCounts[q.category] || 0) + 1; });

  const grid = document.getElementById('cat-grid');
  grid.innerHTML = CATEGORIES.map(cat => {
    const count = cat.id === 'all' ? QUESTIONS.length : (catCounts[cat.id] || 0);
    const sel = state.activeCategory === cat.id ? ' selected' : '';
    return '<div class="cat-card ' + cat.color + sel + '" onclick="selectCategory(\'' + cat.id + '\')">' +
      '<div class="cat-icon">' + cat.icon + '</div>' +
      '<div class="cat-name">' + cat.label + '</div>' +
      '<div class="cat-count">' + count + ' question' + (count !== 1 ? 's' : '') + '</div>' +
      '</div>';
  }).join('');
}

function selectCategory(id) {
  state.activeCategory = id;
  renderCategories();
  const count = id === 'all' ? QUESTIONS.length : QUESTIONS.filter(q => q.category === id).length;
  document.getElementById('start-info').textContent = count + ' questions — shuffled every time';
}

function startQuiz() {
  const pool = state.activeCategory === 'all'
    ? QUESTIONS
    : QUESTIONS.filter(q => q.category === state.activeCategory);

  state.questions = shuffle(pool).map(prepareQuestion);
  state.index = 0;
  state.score = 0;
  state.results = [];

  show('quiz-screen');
  renderQuestion();
}

// ── Quiz screen ───────────────────────────────────────────────────────────────

function renderQuestion() {
  const q = state.questions[state.index];
  const total = state.questions.length;

  // Progress bar
  document.getElementById('qz-bar').style.width = ((state.index / total) * 100) + '%';
  document.getElementById('qz-counter').textContent = (state.index + 1) + ' / ' + total;

  // Category badge
  const cat = CATEGORIES.find(c => c.id === q.category);
  const badge = document.getElementById('qz-badge');
  badge.textContent = cat.icon + ' ' + cat.label;
  badge.className = 'qz-badge ' + cat.color;

  // Question
  document.getElementById('qz-question').textContent = q.q;

  // Options
  const labels = ['A', 'B', 'C', 'D'];
  document.getElementById('qz-options').innerHTML = q.options.map((opt, i) =>
    '<button class="opt-btn" onclick="selectAnswer(' + i + ')">' +
    '<span class="opt-label">' + labels[i] + '</span>' +
    '<span class="opt-text">' + opt + '</span>' +
    '</button>'
  ).join('');

  document.getElementById('qz-explain').style.display = 'none';
  document.getElementById('btn-next').style.display = 'none';
  updateScoreLive();
}

function selectAnswer(idx) {
  const q = state.questions[state.index];
  const opts = document.querySelectorAll('.opt-btn');

  opts.forEach(btn => { btn.disabled = true; });

  const isCorrect = idx === q.answer;
  if (isCorrect) {
    opts[idx].classList.add('correct');
    state.score++;
  } else {
    opts[idx].classList.add('wrong');
    opts[q.answer].classList.add('show-answer');
  }

  state.results.push({ correct: isCorrect, category: q.category });

  // Explanation
  const explainEl = document.getElementById('qz-explain');
  explainEl.innerHTML = '<div class="qz-explain-label">Why?</div><p>' + q.explain + '</p>';
  explainEl.style.display = '';

  // Next button
  const nextBtn = document.getElementById('btn-next');
  const isLast = state.index === state.questions.length - 1;
  nextBtn.textContent = isLast ? 'See Results →' : 'Next →';
  nextBtn.style.display = '';

  updateScoreLive();
}

function updateScoreLive() {
  const answered = state.results.length;
  const el = document.getElementById('qz-score-live');
  if (answered === 0) { el.innerHTML = ''; return; }
  el.innerHTML = 'Score: <strong>' + state.score + '</strong> / ' + answered;
}

function nextQuestion() {
  if (state.index < state.questions.length - 1) {
    state.index++;
    renderQuestion();
  } else {
    showResults();
  }
}

// ── Result screen ─────────────────────────────────────────────────────────────

function showResults() {
  const total = state.questions.length;
  const pct = Math.round((state.score / total) * 100);

  document.getElementById('res-score-num').textContent = state.score;
  document.getElementById('res-total').textContent = total;

  const pctEl = document.getElementById('res-pct');
  pctEl.textContent = pct + '%';

  let msg = '';
  if (pct >= 90) {
    pctEl.style.color = '#4ade80';
    msg = 'Outstanding! You are more than ready for this interview.';
  } else if (pct >= 75) {
    pctEl.style.color = '#38bdf8';
    msg = 'Great work! Review the wrong answers and you will be well prepared.';
  } else if (pct >= 50) {
    pctEl.style.color = '#fbbf24';
    msg = 'Getting there. Go through the wrong answers and try again.';
  } else {
    pctEl.style.color = '#f87171';
    msg = 'Keep studying! Review the checklist, then try this quiz again.';
  }
  document.getElementById('res-msg').textContent = msg;

  // Category breakdown
  const catMap = {};
  CATEGORIES.filter(c => c.id !== 'all').forEach(c => {
    catMap[c.id] = { label: c.label, icon: c.icon, correct: 0, total: 0 };
  });
  state.results.forEach((r, i) => {
    const cat = state.questions[i].category;
    if (catMap[cat]) { catMap[cat].total++; if (r.correct) catMap[cat].correct++; }
  });

  const rows = Object.values(catMap).filter(c => c.total > 0).map(c => {
    const p = Math.round((c.correct / c.total) * 100);
    const barColor = p >= 75 ? '#4ade80' : p >= 50 ? '#fbbf24' : '#f87171';
    return '<div class="breakdown-row">' +
      '<div class="breakdown-cat">' + c.icon + ' ' + c.label + '</div>' +
      '<div class="breakdown-bar-wrap"><div class="breakdown-bar" style="width:' + p + '%;background:' + barColor + '"></div></div>' +
      '<div class="breakdown-nums">' + c.correct + '/' + c.total + '</div>' +
      '</div>';
  }).join('');

  document.getElementById('res-breakdown').innerHTML = '<h3>Breakdown by Topic</h3>' + rows;

  // Retry wrong button
  const wrongCount = state.results.filter(r => !r.correct).length;
  const retryBtn = document.getElementById('btn-retry');
  if (wrongCount > 0) {
    retryBtn.textContent = 'Retry ' + wrongCount + ' Wrong Answer' + (wrongCount !== 1 ? 's' : '');
    retryBtn.style.display = '';
  } else {
    retryBtn.style.display = 'none';
  }

  show('result-screen');
}

function retryWrong() {
  const wrong = state.questions.filter((q, i) => !state.results[i].correct);
  state.questions = shuffle(wrong).map(prepareQuestion);
  state.index = 0;
  state.score = 0;
  state.results = [];
  show('quiz-screen');
  renderQuestion();
}

function goToStart() {
  show('start-screen');
  renderCategories();
}

// ── Keyboard shortcuts ────────────────────────────────────────────────────────

document.addEventListener('keydown', function(e) {
  if (document.getElementById('quiz-screen').style.display === 'none') return;
  const opts = document.querySelectorAll('.opt-btn');
  const nextBtn = document.getElementById('btn-next');

  if (['1','2','3','4'].includes(e.key)) {
    const idx = parseInt(e.key, 10) - 1;
    if (opts[idx] && !opts[idx].disabled) selectAnswer(idx);
  }
  if ((e.key === 'Enter' || e.key === 'ArrowRight') && nextBtn.style.display !== 'none') {
    nextQuestion();
  }
});

// ── Init ──────────────────────────────────────────────────────────────────────

renderCategories();
