# 📚 **@octamap/alpine-router**

A lightweight and powerful router for **Alpine.js** applications. Define routes directly in your HTML with ease, supporting both **static file-based routing**, **dynamic programmatic navigation**, and **query parameters**.

---

## 🚀 **Features**

✅ **Declarative Routing:** Define routes seamlessly with the `router` attribute.  
✅ **Static Routing:** Map routes to files in your `/public` folder automatically.  
✅ **Dynamic API:** `$router` for navigation (`push`, `replace`, `path`, `query`).  
✅ **Query Parameter Support:** Manage and access URL query strings effortlessly.  
✅ **TypeScript Support:** Full type support, even with the CDN version.  
✅ **Lightweight:** Just **1.2 KB** (gzipped).  
✅ **Flexible Installation:** Use via **npm** or **jsDelivr CDN**.  
✅ **Transition Support:** Easy to add smooth transitions during route changes.  

---

## 📦 **Installation**

### **Using npm**
```bash
npm install @octamap/alpine-router
```

Then import it into your code (ensure **Alpine.js** is loaded beforehand):

```js
import "@octamap/alpine-router";
```

### **Using jsDelivr CDN**
Add the script **before** Alpine.js:

```html
<!-- Alpine Router -->
<script src="https://cdn.jsdelivr.net/npm/@octamap/alpine-router@1.x.x"></script>
<!-- Alpine.js -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
```

### **TypeScript Support**
Create a TypeScript declaration file (`alpine-router.d.ts`):

```ts
import "@octamap/alpine-router/types";
```

---

## 🛠️ **Usage**

### **1. Define Your Router**
Add the `router` attribute to your HTML element:

```html
<body>
  <div router="my-router">
    <h2>Default Page (shown at `/`)</h2>
  </div>
</body>
```

### **2. Structure Routes in `/public`**

Organize your route pages in the `/public` folder:

```
/src
/public
    /my-router
        login.html       // Accessible at `/login`
        check-inbox.html // Accessible at `/check-inbox`
```

When users visit `/login`, `login.html` will be loaded.

---

## 🌐 **Dynamic Routing API**

### **Within Alpine Components**

Navigate dynamically using `$router`:

```html
<div x-show="$router.path === `/`">
  <button @click="$router.push('/login')">Go to Login</button>
</div>
```

**API Methods:**
- `$router.push(path)` → Navigate to a new route.  
- `$router.replace(path)` → Replace the current route.  
- `$router.path` → Get the current path.  
- `$router.query` → Access query parameters.  

### **Global Access via `window.router`**

Use global routing methods:

```js
window.router.push('/login');  // Navigate to `/login`
window.router.replace('/home'); // Replace current path with `/home`
```

---

## 🌟 **Using Query Parameters**

### **1. Access Query Parameters**

You can access query parameters directly using `$router.query`.

**Example:**
```html
<div x-data>
    <p>Current User: <span x-text="$router.query.user"></span></p>
    <p>Theme: <span x-text="$router.query.theme"></span></p>
</div>
```

**Given URL:**  
```
/profile?user=123&theme=dark
```

**Result:**
- `$router.query.user` → `"123"`
- `$router.query.theme` → `"dark"`

---

### **2. Navigate with Query Parameters**

#### **Using `$router.push`**
Adds an entry to the browser history while including query parameters.

```js
$router.push('/dashboard', { user: '456', theme: 'light' });
```

**Resulting URL:**  
```
/dashboard?user=456&theme=light
```

#### **Using `$router.replace`**
Replaces the current history entry with a new path and query parameters.

```js
$router.replace('/settings', { mode: 'edit', debug: 'true' });
```

**Resulting URL:**  
```
/settings?mode=edit&debug=true
```

---

### **3. Dynamically Update Query Parameters**

If you want to update only the query parameters while keeping the current path:

```js
$router.replace($router.path, { sort: 'asc', filter: 'active' });
```

**Resulting URL (assuming current path is `/tasks`):**  
```
/tasks?sort=asc&filter=active
```

---

### **4. Reactive Query in Alpine.js**

Query parameters in Alpine.js are reactive:

```html
<div x-data>
    <p>Current Page: <span x-text="$router.query.page || 'No page specified'"></span></p>
</div>
```

Navigate dynamically:

```js
$router.push('/items', { page: '2' });
```

**Dynamic Update Result:**  
```
2
```

---

## 🎭 **Transitions on Navigation**

Add smooth transitions during route changes:

```html
<body router="main" router-transition="fade" style="transition: opacity 0.15s;">
  <h2>Welcome Page</h2>
  <button @click="$router.push('/another-path')">Navigate</button>
</body>
```

**Key Attributes:**
- `router="main"` → Sets the main router container.  
- `router-transition="fade"` → Enables fade transitions.  
- `transition: opacity 0.15s;` → Adds smooth fading.

When navigating, content will **fade out** before the new content **fades in**.

---

## 📘 **API Reference**

| Method            | Description                  | Example                           |
| ----------------- | ---------------------------- | --------------------------------- |
| `$router.push`    | Navigate to a path           | `$router.push('/home')`           |
| `$router.replace` | Replace current path         | `$router.replace('/about')`       |
| `$router.path`    | Get the current path         | `console.log($router.path)`       |
| `$router.query`   | Get current query parameters | `console.log($router.query.user)` |

---

## 🔗 **CDN Example**

Example setup using Alpine.js and Alpine Router via CDN:

```html
<!-- Alpine.js -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x"></script>
<!-- Alpine Router -->
<script src="https://cdn.jsdelivr.net/npm/@octamap/alpine-router"></script>

<body>
  <div router="my-router">
    <h2 x-show="$router.path === '/'">Home Page</h2>
    <p>User: <span x-text="$router.query.user"></span></p>
    <button @click="$router.push('/login', { user: '123' })">Go to Login</button>
  </div>
</body>
```

---

## 📑 **TypeScript Support**

To enable TypeScript support:
1. Create a file `alpine-router.d.ts`.
2. Add the following content:

```ts
import "@octamap/alpine-router/types";
```

Enjoy full TypeScript support across your app.

---

## 🛡️ **License**

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 **Contributing**

We welcome contributions!  
- Report issues  
- Suggest improvements  
- Open pull requests  

Find us on [GitHub](https://github.com/octamap/alpine-router).

---

## 🧑‍💻 **Author**

Developed with ❤️ by **Octamap Team**.

---

Happy Routing! 🚦✨