**Nextjs use file routing system

**Each folder has page.tsx and layout.tsx both used for UI 

**To do DOM manipulation in nextJS we have to write "use client"

** a tag can reload page so use LINK

** For Dark Mode -> @variant dark (&:where(.dark, .dark *)); -> global css

** grouping in next js -> app/(marketing)/about/page.js  → URL: /about   (not /marketing/about)
   *Organize routes without affecting URL
   *Different layouts for different sections

** const cards = courseData.courses as Course[] --> type assertion

** image in nextJs -> Next.js Image excels in size optimization by automatically serving correctly sized images for each device
   *An absolute external URL (must be configured with remotePatterns).


** Backend in Api folder in app

** Data modeling -> Backend -> frontend

** Next -> no particular server it uses edge computing
   *In Next.js, we check if the model already exists to prevent Mongoose from crashing due to a "Cannot overwrite model once compiled" error. This problem happens because Next.js uses a Serverless/Server-less environment and features Hot Module Replacement (HMR) during development, which constantly re-runs your code files every time you save

** Next -> by default everthing is server component -> compile in server and browser get only html css and minimal js pre cooked, but if need interactivity "use client" component will become client component

** proxy -> Proxy allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.