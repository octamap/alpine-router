# 📚 **@octamap/alpine-router**

A lightweight router for Alpine.js applications that allows you to define routes directly in your HTML. It supports both static route definitions via folder structure and dynamic programmatic routing.

---

## 🚀 **Features**

- **Declarative Routing**: Define routes directly in your HTML using the `router` attribute.  
- **Static File-Based Routing**: Automatically map routes to static files in your `/public` folder.  
- **Dynamic Routing API**: `$router` handler for programmatic navigation (`push`, `replace`, `path`).  
- **TypeScript Support**: Access full TypeScript types even when using the CDN version.  
- **CDN or NPM Compatible**: Install via npm or include it via jsDelivr. (just **1.2 KB** in total)

---

## 📦 **Installation**

### **Using npm**
```bash
npm install @octamap/alpine-router
```

And then import it anywhere in your code (keep in mind that Alpine.js needs to be loaded before you import it)

```js
import "@octamap/alpine-router"
```


### **Using jsDelivr CDN**
Add the following script tag to your project **before** Alpine.js:
```html
<!-- Add alpine-router -->
<script src="https://cdn.jsdelivr.net/npm/@octamap/alpine-router@1.x.x"></script>

<!-- Add Alpine.js -->
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
```

To enable TypeScript support, create a `d.ts` file:
```ts
import "@octamap/alpine-router/types";
```

---

## 🛠️ **Usage**

### **1. Define Your Router**

Add the `router` attribute to an HTML element:

```html
<body>
    <div router="my-router">
        <h2>Default Page (shown when current path is at /)</h2>      
    </div>
</body>
```

### **2. Structure Your Routes in `/public`**

Place your route pages in the `/public` folder:

```
/src
/public (static folder)
    /my-router
        login.html       // Shown at /login
        check-inbox.html // Shown at /check-inbox
```

When users navigate to `/login`, `login.html` will be rendered.

---

## 🌐 **Dynamic Routing API**

### **Using `$router` in Alpine.js**

You can handle navigation directly in your Alpine components:

```html
<div class="login-page" x-show="$router.path == `/`" x-init="addTurnstile">
    <button @click="$router.push('/login')">Go to Login</button>
</div>
```

- `$router.push(path)` → Navigate to a new path.  
- `$router.replace(path)` → Replace the current path in history.  
- `$router.path` → Get the current path.  

### **Programmatically via `window.router`**

Access routing globally:

```js
window.router.push('/login');  // Navigate to /login
window.router.replace('/home'); // Replace current path with /home
```

---

## 📘 **API Reference**

| Method            | Description            | Example                     |
| ----------------- | ---------------------- | --------------------------- |
| `$router.push`    | Navigate to a new path | `$router.push('/home')`     |
| `$router.replace` | Replace current path   | `$router.replace('/about')` |
| `$router.path`    | Get the current path   | `console.log($router.path)` |

---

## 📑 **TypeScript Support**

To enable TypeScript support when using jsDelivr:
1. Create a TypeScript declaration file (e.g., `alpine-router.d.ts`).
2. Add the following:
```ts
import "@octamap/alpine-router/types";
```

This ensures full typing for `$router`.

---

## 🔗 **CDN Example**

Here’s an example of using the router with Alpine.js and jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x"></script>
<script src="https://cdn.jsdelivr.net/npm/@octamap/alpine-router"></script>

<body>
    <div router="my-router">
        <h2 x-show="$router.path == '/'">Home Page</h2>
        <button @click="$router.push('/login')">Go to Login</button>
    </div>
</body>
```

---

## 📄 **License**

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 **Author**

Developed by **Octamap Team**.

For any issues, suggestions, or contributions, feel free to open an issue or a pull request on [GitHub](https://github.com/octamap/alpine-router).

---

Happy Routing! 🚦✨