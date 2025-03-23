import Link from "@tiptap/extension-link";
const linkExtension = Link.configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  protocols: ["http", "https"],
  isAllowedUri: (url, ctx) => {
    try {
      const parsedUrl = url.includes(":") ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false;
      }

      const disallowedProtocols = ["ftp", "file", "mailto"];
      const protocol = parsedUrl.protocol.replace(":", "");

      if (disallowedProtocols.includes(protocol)) {
        return false;
      }

      const allowedProtocols = ctx.protocols.map((p) => (typeof p === "string" ? p : p.scheme));
      if (!allowedProtocols.includes(protocol)) {
        return false;
      }

      const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
      if (disallowedDomains.includes(parsedUrl.hostname)) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },
  shouldAutoLink: (url) => {
    try {
      const parsedUrl = url.includes(":") ? new URL(url) : new URL(`https://${url}`);

      const disallowedDomains = ["example-no-autolink.com", "another-no-autolink.com"];
      return !disallowedDomains.includes(parsedUrl.hostname);
    } catch {
      return false;
    }
  },
});


const setLink = (editor) => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

export { linkExtension,setLink};
