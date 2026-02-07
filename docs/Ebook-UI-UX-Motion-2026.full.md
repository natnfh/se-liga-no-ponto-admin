# **The Physics of Interface: A Technical and Aesthetic Deep Dive into Next-Generation UI/UX (2025–2026)**

## **1\. Executive Summary: The Shift to "Alive" Interfaces**

The trajectory of digital interface design for late 2025 and 2026 is defined by a singular, overarching philosophy: the transition from static, representative interfaces to dynamic, "alive" environments. For the past decade, the industry has oscillated between skeuomorphism and flat design, eventually settling on a safe, albeit sterile, middle ground of neumorphism and subtle depth. However, the emerging standard for flagship products—championed by design-driven entities and accelerated by the spatial computing paradigms of visionOS—demands a fundamental reimagining of the screen. We are moving away from the screen as a canvas of pixels and toward the screen as a window into a physically simulated world.

This report provides an exhaustive analysis of this shift, characterizing the "Feel" Engineering that distinguishes premium software from standard utilities. We explore the move beyond "making it pretty" to "making it feel tangible," where every interaction is governed by consistent physical laws rather than arbitrary easing curves. The analysis dissects the technical implementation of these effects, distinguishing between the performant, battery-conscious reality of production code and the unoptimized concepts often seen on social platforms.

We posit that the "Meta" for 2026 is defined by **Luminal Physics**: a design language combining the fluid, refractive properties of evolved glassmorphism ("Liquid Glass") with the self-illuminating, organic behaviors of bioluminescence. This aesthetic is powered not by standard CSS transitions, but by real-time shader pipelines (GLSL, Metal, WebGPU) and state-driven vector runtimes (Rive), enabling interfaces that react continuously to input rather than playing back pre-baked animations.

The following sections dissect the visual aesthetics, motion semantics, immersive patterns, and technical stacks required to build these next-generation experiences, supported by current industry data and technical benchmarks.

## ---

**2\. Visual Aesthetics & Rendering Effects: The Shader-First Era**

The visual fidelity of modern interfaces is no longer bound by the limitations of the DOM or standard UI kit views. The cutting edge of design employs techniques traditionally reserved for game development, bringing cinematic rendering capabilities to utility applications.

### **2.1 Shader-Based UI: Beyond the Standard Library**

The most significant technical leap in 2025 is the normalization of shader-based rendering in standard app UI. While standard libraries offer basic blending and blurring, they lack the computational flexibility to create organic, non-uniform effects. Shaders, small programs that run on the GPU, manipulate pixels (fragment shaders) or geometry (vertex shaders) in real-time, allowing for visual outputs that are mathematically defined rather than image-based.

#### **2.1.1 Signed Distance Functions (SDFs) and Morphing**

Signed Distance Functions (SDFs) have migrated from the demo scene to production UI. Unlike raster images or standard vectors, SDFs mathematically define shapes based on the distance of a pixel to the shape's edge. This allows for infinite resolution and, crucially, "gooey" morphing effects where separate elements seamlessly merge when in proximity.

* **Mechanism:** By utilizing a smooth-minimum function to blend the distance fields of two objects (e.g., a button and a cursor), designers create a fluid bridge between them. This is the underlying technology behind the "metaball" effects seen in the "Dynamic Island" and advanced tab bars.1 The mathematical operation allows the boundaries of two distinct shapes to dissolve into one another based on proximity, creating a biological, cellular aesthetic that feels "alive" rather than mechanical.  
* **Implementation:** In SwiftUI, this is often achieved using Canvas views or Color.matrix filters to threshold alpha channels. However, for maximum performance, developers are turning to Metal fragment shaders applied via the .layerEffect modifier.3 In the WebGL context, this is standard GLSL (OpenGL Shading Language), often abstracted via libraries like React Three Fiber (R3F) to run efficiently within a React application.

#### **2.1.2 Noise, Grain, and Texture**

The sterile "digital" look—characterized by perfect solid colors and linear gradients—is being replaced by texture. Perlin noise, Simplex noise, and fractal Brownian motion (fBm) are used to generate dynamic backgrounds that feel like moving smoke, water, or cloud layers.

* **Utility:** Grain is utilized not just for an aesthetic "lo-fi" vibe but for functional purposes. It reduces color banding in complex gradients (dithering) and gives "tooth" to glass surfaces, making them feel tactile rather than slippery.4  
* **Technical Execution:** Implementing noise requires careful performance management. Generating noise on the CPU is prohibitively slow for 60fps animations. Instead, noise functions are executed on the GPU via shaders. On the web, developers use GLSL noise algorithms within R3F materials. On iOS, Metal shaders generate noise textures that can overlay standard UI components, adding a subtle film grain that makes the interface feel less like a screen and more like a physical material.

### **2.2 Material Evolution: Luminal UI and Liquid Glass**

The flat layers of Material Design 3 and the rigid frosted glass of early iOS have evolved into more complex material simulations known as "Liquid Glass" and "Luminal UI."

#### **2.2.1 Liquid Glass (Refraction and Chromatic Aberration)**

"Liquid Glass" is a material descriptor for interfaces that emulate high-viscosity fluids rather than solid frosted glass. This trend represents a major shift from static transparency to dynamic refraction.

* **Physics:** It involves real-time background blurring with variable radius (blurrier further away from the surface), coupled with chromatic aberration (RGB splitting) at the edges to simulate high refractive indices.5 This mimics how thick glass or water bends light, separating the wavelengths at the fringes.  
* **Dynamic Distortion:** Unlike static blur, Liquid Glass distorts the content behind it based on movement. As a user drags a panel, the background doesn't just blur; it warps slightly in the direction of inertia, simulating the drag of a physical medium.8 This "interactive transparency" makes the UI feel responsive to the physical force of the user's touch.  
* **Tech Stack:** On the web, this requires WebGL (React Three Fiber) because standard CSS backdrop-filter does not support directional distortion or chromatic aberration. On iOS, this is a prime candidate for Metal shaders, allowing developers to manipulate the destination texture (the background) before drawing the source texture (the glass panel).9

#### **2.2.2 Luminal UI and Bioluminescence**

To counter the contrast and legibility issues inherent in glassmorphism, "Luminal UI" introduces self-emitting light sources within the interface. Elements do not just reflect light; they emit it, drawing inspiration from bioluminescent organisms.

* **Bioluminescence:** Inspired by deep-sea organisms, this trend uses deep, dark backgrounds (OLED black or dark teal) punctuated by neon gradients that appear to "glow" from within the UI elements.10 The palette favors "toxic" greens, electric teals, and magentas against void-like backgrounds.11  
* **Implementation:** This is rarely achieved with simple box-shadow, which looks flat and uniform. Instead, it uses multi-layered radial gradients with varying opacity and blending modes (Screen, Overlay) to create a hot "core" and a diffuse "corona".12 This creates a sense of internal energy, suggesting the interface is powered by a living energy source rather than just being painted pixels.  
* **Legibility & Dark Mode:** Proponents argue that bioluminescence solves the "Liquid Glass" contrast problem in dark mode. By making interactive elements emit light (bioluminescent icons or text), designers ensure legibility against complex backgrounds while maintaining the immersive atmosphere.13

### **2.3 Real-Time Lighting and "Pseudo-3D"**

2026 design introduces a light source that is independent of the screen pixels, creating a virtual environment where UI elements interact with lighting.

* **Cursor/Touch Lighting:** On desktop and web, a "spotlight" follows the cursor, revealing borders or altering the gradient angle of cards (the "Linear" look).14 This technique, often called "hover spotlight," uses the cursor's X/Y coordinates to mask a gradient layer, creating the illusion that the cursor is a flashlight illuminating a dark surface.  
* **Mobile Gyroscope Effects:** On mobile, where there is no cursor, this often utilizes the device's gyroscope. As the user tilts their phone, the specular highlights and reflections on UI cards shift, creating a "holographic" effect.2 This connects the physical orientation of the device to the digital rendering, reinforcing the "tangible" feel.  
* **Inner Shadows & Caustics:** To create depth without heavy drop shadows (which feel dated), designers rely on sharp inner shadows (simulating a cut-out or pressed state) and caustic lighting patterns. Caustics simulate light refracting through a transparent surface and projecting patterns onto the surface below, adding rich, organic detail to otherwise flat backgrounds.15

### **2.4 Generative UI: The Adaptive Surface**

Moving beyond static layouts, Generative UI (GenUI) represents the convergence of AI and design systems. It moves away from pre-determined screens to interfaces that are assembled in real-time.

* **Concept:** Interfaces that generate their own layout or components based on the specific content or user context. A weather app might generate a "stormy" UI container with rain physics when it's raining, rather than just changing an icon.16 Or, a dashboard might rearrange its widgets based on what the user is currently working on, prioritizing relevant data streams.17  
* **Execution:** This involves Large Language Models (LLMs) streaming UI component definitions (e.g., via Vercel's AI SDK) which are then hydrated into React Server Components (RSC). The "look" is consistent (via a design system like "Crayon"), but the composition is fluid and unique to the moment.18  
* **Streaming Components:** The Vercel AI SDK allows for the streaming of React components directly from the server as the AI generates the response. This means the UI is built incrementally, reducing perceived latency and allowing for highly dynamic, context-aware interfaces that were previously impossible to hard-code.19

## ---

**3\. Motion Semantics & Physics: The "Feel" of Interaction**

A visual effect is only as premium as its movement. The distinction between a "clunky" app and a "magical" one often lies in the mathematics of its motion engine. "Feel" engineering requires a shift from timeline-based thinking to physics-based thinking.

### **3.1 Interruptible Animations & Spring Physics**

The era of "Fire-and-Forget" animations—standard Bezier curves defined by a fixed duration and easing curve—is over. These animations are rigid; once started, they must complete their path or snap awkwardly if interrupted.

* **The Problem with Duration:** In a standard CSS transition (transition: all 0.3s ease), if a user interrupts an animation (e.g., catches a card mid-dismissal to bring it back), the animation logic typically struggles. It usually has to restart from the current position with a new duration, often leading to a jarring velocity change.  
* **The Spring Solution:** Spring physics are defined by stiffness (tension), damping (friction), and mass—not time. If a user interrupts a spring animation, the object retains its current velocity and seamlessly redirects toward the new target. This momentum preservation is critical for the "tangible" feel.15 The interface behaves like a physical object with mass, reacting naturally to external forces.  
* **Tools:** Apple's SwiftUI uses spring-based animations by default (.interactiveSpring or .spring(response:dampingFraction:)). On the web, libraries like Framer Motion and React Spring have largely replaced GSAP for interaction-heavy animations because they model this interruptibility natively, calculating the physics frame-by-frame.21

### **3.2 Shared Element Transitions (The Hero Morph)**

Navigating between views should never feel like a hard cut. The mental model of the user is that they are navigating a contiguous space, not switching between separate HTML pages.

* **Continuity:** When a user taps a card in a feed to view details, that specific card should morph into the header of the new view. The thumbnail expands, the text repositions, and the background floods the screen. This preserves context and reduces cognitive load.  
* **Implementation:**  
  * **Native:** SwiftUI’s matchedGeometryEffect handles this by interpolating the frame and position of two views with the same ID across a hierarchy change.15 It calculates the difference in size and position and smoothly animates the view between the two states, even if they reside in completely different parts of the view hierarchy.  
  * **Web:** The View Transitions API (now with native browser support) and Framer Motion’s layoutId prop allow for these seamless morphs. They calculate the transform matrix required to warp an element from state A to state B without layout thrashing, creating a "magic move" effect.21

### **3.3 Micro-Choreography and Stagger**

Cognitive load is managed through the choreography of entrance and exit animations. Showing too much information at once overwhelms the user.

* **Stagger:** Never animate a list of items as a single block. Staggering them (e.g., 50ms delay between items) guides the eye and makes the interface feel lighter and more playful. It creates a rhythm to the data presentation.  
* **Directionality:** Motion must follow the user's intent. If a new screen pushes in from the right, the old one should recede (parallax scale down) rather than just sliding left. This "depth" cue helps users build a mental map of the app's spatial hierarchy, understanding where they are in relation to where they came from.

### **3.4 Scrollytelling 2.0: The Camera Move**

Scrolling is the primary interaction model for the web. "Scrollytelling" transforms the scrollbar from a page-positioning tool into a timeline scrubber.

* **The Camera Metaphor:** Instead of moving elements *up* the screen, modern scrollytelling moves a virtual camera *through* a scene. This is evident in 3D product pages where scrolling rotates a model, zooms into a feature, or explodes a component view.22 The user is the director, controlling the playback speed of the narrative with their scroll.  
* **Tech Stack:** This is dominated by **GSAP (GreenSock)** with ScrollTrigger paired with **React Three Fiber (R3F)**. The scroll position is normalized (0 to 1\) and used to drive the camera.position and camera.lookAt vectors in the 3D scene. This is synchronized with HTML text elements that fade in/out or split apart using GSAP's SplitText capabilities.24 The scrub property in GSAP is essential here, linking the animation progress directly to the scrollbar, allowing for precise forward and backward playback.

## ---

**4\. Immersive & Spatial Patterns: The VisionOS Effect**

Apple’s Vision Pro has introduced a "Spatial Design" language that is rapidly bleeding back into 2D screens (mobile and desktop). Even if users aren't wearing a headset, they expect the depth and responsiveness associated with spatial computing.

### **4.1 The "VisionOS Effect" in 2D**

* **Gaze-Based Hover:** On Vision Pro, buttons glow when looked at (eye tracking). On desktop/web, this translates to highly reactive hover states. On mobile, where there is no hover, this is simulated using touch proximity or gyroscope data to create a "shimmer" or "glow" that suggests the element is aware of the user's attention.25 The interface anticipates interaction.  
* **Depth Layering:** VisionOS relies on z-depth to denote hierarchy. In 2D apps, this manifests as "Floating UI"—modals, tab bars, and panels that float above the content with frosted glass backgrounds. They cast soft, colored shadows (shadows that take the color of the element casting them) to suggest elevation and translucency.2  
* **Glass Materiality:** The "VisionOS effect" explicitly refers to the heavy use of glass textures that blur the background, allowing the user to maintain context of what is behind the active window. This is achieved in CSS via backdrop-filter: blur() and saturate(), mimicking the pass-through video feed of a headset.26

### **4.2 3D in 2D: The Spline and Rive Revolution**

The integration of lightweight 3D assets into standard UI is becoming ubiquitous, replacing static illustrations.

* **Spline/R3F:** Tools like Spline allow designers to export interactive 3D scenes that run natively in the browser via WebGL. A "Like" button might be a 3D heart that spins and explodes into particles when clicked.28 These are not pre-rendered videos; they are real-time scenes.  
* **Interaction:** These assets react to cursor position or device orientation. A 3D character might turn its head to follow the mouse, or a credit card might tilt as the user inputs their CVC to show the back of the card.14 This interactivity bridges the gap between content and control.

### **4.3 Haptic Synergy**

Visuals account for only part of the "feel." Haptics provide the physical confirmation of the digital action, closing the sensory loop.

* **Synchronization:** The gold standard is synchronizing haptics with the visual impact. If a ball bounces on screen, the haptic "thud" must occur exactly at the frame of impact. A disconnect here breaks the illusion immediately.30  
* **CoreHaptics (iOS):** Apple’s CoreHaptics API allows for sophisticated haptic design. Developers can define "Sharp," "Dull," or "Texture" based vibrations. Haptics can be defined in AHAP files (Apple Haptic Audio Pattern), which are JSON-like descriptions of haptic events over time, allowing them to be played in sync with animations.31  
* **Audio-Haptics:** New in iOS 18 is the "Music Haptics" feature, which uses the Taptic Engine to play textures derived from audio. While designed for accessibility, this API allows designers to create "audio-haptic" experiences where UI sound effects are physically felt. For example, a "woosh" sound for a sent email can be accompanied by a haptic wave that matches the sound's intensity envelope.33

## ---

**5\. Tech Stack & Feasibility: The Implementation Reality**

Achieving these effects requires a specific set of tools. The divide between "Designer Tools" (Figma, After Effects) and "Developer Tools" is bridging, but choosing the right stack is critical for performance and fidelity.

### **5.1 Web Stack: The GLSL Powerhouse**

* **React Three Fiber (R3F):** The de facto standard for 3D on the web. It is a React renderer for Three.js, allowing declarative management of scenes. It manages the canvas loop efficiently, allowing React state to drive 3D attributes.29  
* **Shaders (GLSL):** Essential for "Liquid Glass" and complex distortions. Libraries like drei simplify the inclusion of shaders as materials.35 Custom shaders are written in GLSL and compiled at runtime.  
* **GSAP \+ ScrollTrigger:** The industry standard for timeline-based animations, especially scrollytelling. It handles the complex math of mapping scroll progress to animation frames and provides smoothing via ScrollSmoother or Lenis integration.23  
* **Lenis:** A smooth scrolling library that is essential for scrollytelling. Standard browser scrolling is step-based and can be choppy; Lenis smooths the scroll delta, allowing animations to play fluidly without the "jitter" of native scroll events.37

### **5.2 Native Stack (iOS/Android): The Metal Advantage**

* **SwiftUI:** Now mature enough for complex animations. Canvas, .layerEffect (Metal), and matchedGeometryEffect are the core tools.3  
* **Metal Shaders:** iOS allows compiling Metal shaders that can be dropped directly into SwiftUI views using the .layerEffect modifier. This is significantly more performant than CPU-based rendering as it runs directly on the GPU, allowing for per-pixel manipulation at 120fps.1  
* **Jetpack Compose (Android):** Similar to SwiftUI, using RenderNode and AGSL (Android Graphics Shading Language) for custom drawing operations, enabling shader-based effects on Android.

### **5.3 The Great Debate: Lottie vs. Rive**

The industry is shifting from Lottie (After Effects JSON) to Rive for interactive motion. The data below highlights why Rive is the superior choice for "Alive" interfaces.

| Feature | Lottie (Legacy) | Rive (State of the Art) |
| :---- | :---- | :---- |
| **Origin** | After Effects (Video Tool) | Rive Editor (Interactive Tool) |
| **Format** | JSON (Raster/Vector) | Binary (Vector State Machine) |
| **File Size (Example)** | \~24.37 KB (often much larger) | \~2 KB (Example from benchmark) 39 |
| **Interaction** | Play, Pause, Stop (Linear) | State Machine (Inputs, Triggers, Logic) |
| **Performance (FPS)** | \~17 FPS (JS/UI Thread bottleneck) | \~60 FPS (Runs on C++ Runtime) 39 |
| **Memory (Java)** | \~23 MB | \~12 MB 39 |
| **Memory (Native)** | \~49 MB | \~25 MB 39 |
| **Use Case** | Simple icons, rigid loaders. | Game HUDs, interactive characters, complex UI. |

**Verdict:** For "Alive" interfaces, **Rive** is the mandate. Its State Machine allows the animation to react to logic (e.g., "Upload Speed" variable driving the speed of a fan animation) without code bloat. Lottie is strictly for playback; Rive is for interaction. The benchmarks clearly show Rive outperforming Lottie in frame rate stability and memory footprint, which is crucial for mobile battery life.39

## ---

**6\. Performance-First Fidelity: The 120fps Mandate**

Visuals that drop frames break the illusion of reality. Achieving movie-grade effects on mobile requires strict performance budgeting and an understanding of the hardware.

### **6.1 The Battery & Thermal Cost**

* **Canvas vs. DOM:** WebGL (Canvas) is generally more battery-intensive than CSS transforms because it keeps the GPU active in a high-power state. However, for complex effects (blur \+ noise \+ distortion), WebGL is *more* efficient than stacking multiple CSS filters (backdrop-filter, box-shadow, mask), which cause massive "Overdraw" and force the browser to create new compositing layers.42  
* **Benchmark:** Native HTML/CSS prototypes often consume 3x more battery than optimized GPU-drawn implementations for complex gradients and animations because the browser struggles to rasterize these effects efficiently on the CPU or standard compositor.42  
* **Optimization Strategy:**  
  * **Instanced Mesh Rendering:** In Three.js, use InstancedMesh to render thousands of particles (e.g., a starfield or grain) with a single draw call rather than thousands of individual objects.  
  * **Object Pooling:** Avoid creating new objects (like Vector3) in render loops to prevent garbage collection thrashing, which causes stutter.43  
  * **Frameloop Management:** Use frameloop="demand" in R3F when the scene is static to stop the render loop and save battery, only resuming when interaction occurs.36

### **6.2 Thread Management**

* **Off-Main Thread:** Animations should never run on the main JavaScript thread (which handles logic/React updates). If the main thread blocks, the animation stutters.  
* **Web:** Use the Web Animations API (WAAPI) or run physics calculations in a Web Worker to keep the UI responsive.  
* **Native:** Core Animation and Metal run on the GPU/separate threads. Rive runs its runtime in a highly optimized C++ layer, bridging to the UI thread only for inputs, ensuring that the animation remains at 60fps even if the JS thread drops to 15fps.39

## ---

**7\. Time-Based Analysis: 2024 → 2026**

### **What Looks "Dated" (Avoid These)**

* **Flat Design:** Purely 2D interfaces with no depth feel "dead" and uninformative.  
* **Standard Easing:** ease-in-out curves feel robotic and pre-baked.  
* **Parallax-Free Scroll:** Content that moves at a 1:1 ratio with the finger feels static and lacks dimensionality.  
* **Static Blurs:** Simple frosted glass without noise, borders, or refraction looks "cheap" (reminiscent of the 2020 neumorphism/glassmorphism era).

### **The "Meta" Right Now (Late 2025\)**

* **The "Linear" Look:** Characterized by dark mode, glowing borders that follow the cursor, subtle gradients, and "stars" or particles in the background. It combines technical precision with a "space-age" aesthetic.14  
* **Bento Grids:** Grid-based layouts where every cell is an interactive container. These grids often feature physics-based reordering and drag-and-drop interactions.21  
* **Dynamic Island Morphing:** UI elements that expand and contract fluidly to reveal content, treating the UI as a fluid bubble rather than a rigid box.2

### **What is Coming Next (2026)**

* **Bioluminescent UI:** Dark interfaces with "living" light sources that pulsate and react to data streams.  
* **Agentive UI:** Interfaces that negotiate with AI agents rather than just displaying data. The UI becomes a communication layer between user and agent.45  
* **Hyper-Personalization:** Layouts that morph based on usage patterns (GenUI). The interface "learns" the user's habits and adjusts its layout accordingly.8

## ---

**8\. Deliverables & Actionable Guides**

### **8.1 The "Wow" Catalog: 10 Interaction Patterns**

1. **The Dynamic Island Morph:**  
   * *Context:* Status indicators (loading, success) that need to be unobtrusive yet visible.  
   * *Mechanics:* A pill-shaped element that physically stretches and morphs into a notification banner or media player. It maintains volume consistency—as it gets wider, it gets slightly shorter before snapping to final height.  
   * *How:* Uses SDF morphing (Metal/Canvas) or layout projection (Framer Motion layoutId) to preserve volume during the transition.2  
2. **The Cursor Spotlight:**  
   * *Context:* Highlighting interactive borders in a grid (Bento) layout.  
   * *Mechanics:* A radial gradient "light" that follows the user's cursor *underneath* the UI borders, revealing the edges of cards only when nearby.  
   * *How:* CSS mask-image with a radial gradient tracking mouse X/Y coordinates or a React hook like useGlossEffect.14  
3. **The Liquid Drag:**  
   * *Context:* Swipe gestures for cards or list items.  
   * *Mechanics:* When dragging a card, the trailing edge "lags" behind, stretching the card like taffy before snapping back.  
   * *How:* Vertex shader manipulation based on velocity vectors or Rive mesh deformation.16  
4. **The Scrollytelling Product Exploded View:**  
   * *Context:* Landing pages for complex hardware or products.  
   * *Mechanics:* As the user scrolls, a 3D product (e.g., phone) rotates and separates into layers (screen, battery, chip) to reveal internal components.  
   * *How:* GSAP ScrollTrigger controlling the position.z of different meshes in a Three.js group.23  
5. **The Bioluminescent Glow:**  
   * *Context:* Primary Call-to-Action (CTA) buttons in dark mode.  
   * *Mechanics:* A button that pulses with a neon "heartbeat" when inactive and flares up (blooms) when hovered/tapped.  
   * *How:* Multi-layered radial gradients with mix-blend-mode: overlay animated via CSS keyframes or Lottie/Rive.10  
6. **The Parallax Card:**  
   * *Context:* Feature cards or credit card visualizations.  
   * *Mechanics:* A card where the internal content (image/text) moves slower than the container frame when the user tilts the phone, creating a window-like depth.  
   * *How:* DeviceMotion API (gyroscope) mapping tilt range (-1 to 1\) to transform: translateX/Y values.2  
7. **The "Glass Door" Transition:**  
   * *Context:* Navigating from a list to a detail view.  
   * *Mechanics:* Navigating feels like passing through a glass surface; the old page blurs and zooms forward, dissipating as the new page clarifies from behind.  
   * *How:* Shared element transition combining scale, opacity, and backdrop-filter: blur.  
8. **The Magnetic Button:**  
   * *Context:* Primary navigation or floating action buttons.  
   * *Mechanics:* A button that physically moves towards the cursor when the cursor gets close, as if attracted by a magnet, breaking its grid alignment.  
   * *How:* Framer Motion calculating distance; if distance \< threshold, translate button towards mouse position \* elasticity factor.  
9. **The Kinetic Typography Reveal:**  
   * *Context:* Hero headlines.  
   * *Mechanics:* Text doesn't just fade in; it slides up, un-blurs, and characters stagger in. It feels like the text is "focusing" into existence.  
   * *How:* Splitting text into \<span\> chars and animating filter: blur(10px) \-\> blur(0) and transform: translateY with a stagger delay.47  
10. **The Generative Background:**  
    * *Context:* App backgrounds that need to feel alive but not distracting.  
    * *Mechanics:* An abstract, moving background (e.g., aura, fog) that changes color palette based on the time of day or user "mood" selection.  
    * *How:* WebGL fragment shader using u\_time and u\_color uniforms, driven by app state.4

### **8.2 Technique Matrix: Effect vs. Cost vs. Method**

| Effect | Visual Impact | Performance Cost | Implementation Method (Web) | Implementation Method (Native) |
| :---- | :---- | :---- | :---- | :---- |
| **Frosted Glass** | Medium | Low | CSS backdrop-filter: blur() | SwiftUI .material / UIVisualEffectView |
| **Liquid Glass** | High | High (GPU) | WebGL (R3F) \+ Shaders 6 | Metal Shader (.layerEffect) 3 |
| **Glow/Bloom** | High | Medium | CSS box-shadow / SVG Filters | SwiftUI .shadow / Metal Bloom |
| **3D Object** | High | High | React Three Fiber (Spline) | SceneKit / RealityKit / Spline |
| **Particle System** | High | Variable | WebGL (InstancedMesh) | Metal / SpriteKit |
| **Morphing Shapes** | High | Medium | SVG / Rive | SwiftUI Canvas / Metal SDF |

### **8.3 Code/Tool Mapping**

* **Figma:** Use for static layout and prototyping "intent." Use plugins like "Looper" or "Rive" integration for mockups. Do not rely on Figma's "Smart Animate" for final engineering specs as it doesn't represent physics accurately.  
* **Spline:** Use for creating 3D assets (blobs, objects) to embed in Web/iOS. It bridges the gap between 3D modeling and web implementation.28  
* **Rive:** Use for interactive icons, characters, and state-driven UI elements. This is the "Flash for the modern era" but performance-optimized.40  
* **After Effects:** **DO NOT USE** for UI implementation logic. Lottie exports are heavy and non-interactive compared to Rive. Use AE only for video mockups to show engineers "intent" or for linear video assets.  
* **React Three Fiber:** Use for full-screen immersive backgrounds or 3D product interactions.  
* **SwiftUI:** Use for the core application shell, navigation, and layout transitions.

### **8.4 Accessibility Guardrails**

The pursuit of "Magic" must not exclude users. Motion sensitivity (vestibular disorders) is a real accessibility concern.

* **The "Reduce Motion" Query:**  
  * Always wrap animations in a check for prefers-reduced-motion.  
  * *Do not* just remove animation. Replace "movement" with "opacity." Instead of a card flying in from the bottom, it should gently fade in in-place. This maintains the "change of state" information without triggering nausea.  
* **Hook Implementation:**  
  * **React:** Implement a hook usePrefersReducedMotion() that listens to the media query. Use this boolean to conditionally set animation constants (e.g., duration \= reduceMotion? 0 : 0.5).48  
  * **SwiftUI:** Use the environment variable @Environment(\\.accessibilityReduceMotion) var reduceMotion.  
* **Vestibular Triggers:** Avoid large-scale sweeping motions (parallax backgrounds that move counter to scroll) or rapid flashing (strobe glows). Ensure all animations are user-initiated or slow-moving.

## ---

**9\. Conclusion**

To build a product in 2026 that feels "indistinguishable from magic," you must treat the interface as a simulated physical environment. The magic lies in the **consistency of physics**—the way a button resists a press, the way a panel drags with weight, and the way light refracts through a surface.

By leveraging the "Holy Trinity" of modern UI engineering—**Shaders (Visuals), Springs (Motion), and Haptics (Feel)**—you move beyond serving pixels to serving experiences. The goal is not just to direct the user's eye, but to convince their brain that what they are touching is real. The tools—Rive, Metal, R3F, and CoreHaptics—are mature. The differentiator is now purely execution.

## ---

**10\. Appendix: Technical Implementation References**

### **10.1 React: The "Glossy Shine" Hook**

Implementing a high-performance glow effect requires direct DOM manipulation to avoid React render cycle overhead for mouse movement. The following conceptual code demonstrates the logic.46

JavaScript

// Conceptual implementation of useGlossEffect  
import { useEffect } from 'react';

function useGlossEffect(cardRef, glossRef) {  
  useEffect(() \=\> {  
    const handleMouseMove \= ({ clientX, clientY }) \=\> {  
      if (\!cardRef.current ||\!glossRef.current) return;  
        
      const rect \= cardRef.current.getBoundingClientRect();  
      const x \= clientX \- rect.left;  
      const y \= clientY \- rect.top;  
        
      // Calculate angle and position relative to card center  
      // Apply transform directly to glossRef.current.style to avoid re-renders  
      glossRef.current.style.transform \= \`translate(${x}px, ${y}px)\`;  
      glossRef.current.style.opacity \= '1';  
    };  
      
    const handleMouseLeave \= () \=\> {  
       if (glossRef.current) glossRef.current.style.opacity \= '0';  
    };

    if (cardRef.current) {  
        cardRef.current.addEventListener('mousemove', handleMouseMove);  
        cardRef.current.addEventListener('mouseleave', handleMouseLeave);  
    }  
      
    return () \=\> {  
        if (cardRef.current) {  
            cardRef.current.removeEventListener('mousemove', handleMouseMove);  
            cardRef.current.removeEventListener('mouseleave', handleMouseLeave);  
        }  
    };  
  },);  
}

### **10.2 SwiftUI: The Metal Ripple**

Using ShaderLibrary to access compiled Metal functions for zero-cost distortion.3

Swift

// Conceptual SwiftUI Metal implementation  
Image("background")  
   .layerEffect(  
        ShaderLibrary.Ripple(  
           .float(time), // Driven by TimelineView or KeyframeAnimator  
           .float2(touchPosition),  
           .float(amplitude),  
           .float(frequency),  
           .float(decay)  
        ),  
        maxSampleOffset:.zero  
    )

#### **Referências citadas**

1. Anyone knows how to recreate this effect? metal shader? : r/SwiftUI \- Reddit, acessado em janeiro 23, 2026, [https://www.reddit.com/r/SwiftUI/comments/1nyoc4a/anyone\_knows\_how\_to\_recreate\_this\_effect\_metal/](https://www.reddit.com/r/SwiftUI/comments/1nyoc4a/anyone_knows_how_to_recreate_this_effect_metal/)  
2. iOS 26 Archives \- MacStories, acessado em janeiro 23, 2026, [https://www.macstories.net/tag/ios-26/feed/](https://www.macstories.net/tag/ios-26/feed/)  
3. Ripple Effect with SwiftUI and Metal Shaders (+ a custom water ..., acessado em janeiro 23, 2026, [https://medium.com/@vickipetrova/ripple-effect-with-swiftui-and-metal-shaders-a-custom-water-scene-ba6ec524ca0d](https://medium.com/@vickipetrova/ripple-effect-with-swiftui-and-metal-shaders-a-custom-water-scene-ba6ec524ca0d)  
4. Pekerjaan Harvard ar vr, Pekerjaan | Freelancer, acessado em janeiro 23, 2026, [https://www.freelancer.co.id/job-search/harvard-ar-vr/40](https://www.freelancer.co.id/job-search/harvard-ar-vr/40)  
5. How Glassmorphism Drives User Focus In Complex Enterprise UI | Innoraft, acessado em janeiro 23, 2026, [https://www.innoraft.ai/blog/how-glassmorphism-drives-user-focus-complex-enterprise-ui](https://www.innoraft.ai/blog/how-glassmorphism-drives-user-focus-complex-enterprise-ui)  
6. @specy/liquid-glass-react \- npm, acessado em janeiro 23, 2026, [https://www.npmjs.com/package/@specy/liquid-glass-react](https://www.npmjs.com/package/@specy/liquid-glass-react)  
7. Getting Clarity on Apple's Liquid Glass \- CSS-Tricks, acessado em janeiro 23, 2026, [https://css-tricks.com/getting-clarity-on-apples-liquid-glass/](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)  
8. 10 UI/UX Trends That Will Shape 2026 \- Orizon Design, acessado em janeiro 23, 2026, [https://www.orizon.co/blog/10-ui-ux-trends-that-will-shape-2026](https://www.orizon.co/blog/10-ui-ux-trends-that-will-shape-2026)  
9. SwiftUI Metal Shaders: Creating Custom Visual Effects \- Cindori, acessado em janeiro 23, 2026, [https://cindori.com/developer/swiftui-metal-shaders-effects](https://cindori.com/developer/swiftui-metal-shaders-effects)  
10. Top 10 Color Trends 2026 for Logos, Branding \&Merch | LogoMaker, acessado em janeiro 23, 2026, [https://www.logomaker.com/blog/color-trends/](https://www.logomaker.com/blog/color-trends/)  
11. Color Trends for 2026: Trending Palettes for Designers | AND Academy, acessado em janeiro 23, 2026, [https://www.andacademy.com/resources/blog/graphic-design/color-trends-for-designers/](https://www.andacademy.com/resources/blog/graphic-design/color-trends-for-designers/)  
12. Advanced glows in CSS \- by Jo Verelst \- Medium, acessado em janeiro 23, 2026, [https://medium.com/ida-mediafoundry/advanced-glows-in-css-371a6d1cb1f](https://medium.com/ida-mediafoundry/advanced-glows-in-css-371a6d1cb1f)  
13. Enhancing Liquid Glass legibility with bioluminescent icons and text, acessado em janeiro 23, 2026, [https://discussions.apple.com/thread/256183767](https://discussions.apple.com/thread/256183767)  
14. Best Shadcn UI Block Libraries 2026: The "Open Code" Economy Guide, acessado em janeiro 23, 2026, [https://cssauthor.com/best-shadcn-ui-block-libraries/](https://cssauthor.com/best-shadcn-ui-block-libraries/)  
15. Build SwiftUI apps for iOS 16 \- Design+Code, acessado em janeiro 23, 2026, [https://designcode.io/swiftui-ios16-features/](https://designcode.io/swiftui-ios16-features/)  
16. Top 10 UX/UI Design Trends for 2026 \- Touch4IT, acessado em janeiro 23, 2026, [https://www.touch4it.com/blog/top-10-design-trends-for-2026](https://www.touch4it.com/blog/top-10-design-trends-for-2026)  
17. Generative UI Guide 2025: 15 Best Practices & Examples \- Mockplus, acessado em janeiro 23, 2026, [https://www.mockplus.com/blog/post/gui-guide](https://www.mockplus.com/blog/post/gui-guide)  
18. Building the First Generative UI API: Technical Architecture and Design Decisions Behind C1 \- Thesys, acessado em janeiro 23, 2026, [https://www.thesys.dev/blogs/generative-ui-architecture](https://www.thesys.dev/blogs/generative-ui-architecture)  
19. Generative UI Chatbot with React Server Components \- Vercel, acessado em janeiro 23, 2026, [https://vercel.com/templates/next.js/rsc-genui](https://vercel.com/templates/next.js/rsc-genui)  
20. vercel/ai: The AI Toolkit for TypeScript. From the creators of Next.js, the AI SDK is a free open-source library for building AI-powered applications and agents \- GitHub, acessado em janeiro 23, 2026, [https://github.com/vercel/ai](https://github.com/vercel/ai)  
21. Build a Modern Frontend Developer Portfolio Using Next.js, Tailwind CSS, and Sentry, acessado em janeiro 23, 2026, [https://lunanotes.io/summary/build-a-modern-frontend-developer-portfolio-using-next-js-tailwind-css-and-sentry](https://lunanotes.io/summary/build-a-modern-frontend-developer-portfolio-using-next-js-tailwind-css-and-sentry)  
22. JSHub \- 让你的网站快人一步, acessado em janeiro 23, 2026, [https://jshub.com/](https://jshub.com/)  
23. Part 8-2: Cinematic Scroll Animations for 3D — GSAP ScrollTrigger (Next.js \+ R3f \+ Gsap), acessado em janeiro 23, 2026, [https://www.youtube.com/watch?v=5Wu\_-KB8Wsk](https://www.youtube.com/watch?v=5Wu_-KB8Wsk)  
24. How to Build Cinematic 3D Scroll Experiences with GSAP | Codrops, acessado em janeiro 23, 2026, [https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/)  
25. Notes from Apple's “Create immersive media experiences for visionOS” event \- Medium, acessado em janeiro 23, 2026, [https://medium.com/@portemantho/notes-from-apples-create-immersive-media-experiences-for-visionos-8c289e44039e](https://medium.com/@portemantho/notes-from-apples-create-immersive-media-experiences-for-visionos-8c289e44039e)  
26. Adopting Apple's Liquid Glass: Examples and best practices ..., acessado em janeiro 23, 2026, [https://blog.logrocket.com/ux-design/adopting-liquid-glass-examples-best-practices/](https://blog.logrocket.com/ux-design/adopting-liquid-glass-examples-best-practices/)  
27. How Do I Execute Action On Hover for Model Entities in XCode for visionOS Development?, acessado em janeiro 23, 2026, [https://stackoverflow.com/questions/78524226/how-do-i-execute-action-on-hover-for-model-entities-in-xcode-for-visionos-develo](https://stackoverflow.com/questions/78524226/how-do-i-execute-action-on-hover-for-model-entities-in-xcode-for-visionos-develo)  
28. Intro to iOS 18 \- Design+Code, acessado em janeiro 23, 2026, [https://designcode.io/ios-18-intro/](https://designcode.io/ios-18-intro/)  
29. Build & Deploy an Amazing 3D Portfolio with React.js & Three.js | Beginner Three.js Tutorial, acessado em janeiro 23, 2026, [https://www.youtube.com/watch?v=kt0FrkQgw8w](https://www.youtube.com/watch?v=kt0FrkQgw8w)  
30. Best Practices for Designing Apple Watch Apps with SwiftUI \- A Comprehensive Guide, acessado em janeiro 23, 2026, [https://moldstud.com/articles/p-best-practices-for-designing-apple-watch-apps-with-swiftui-a-comprehensive-guide](https://moldstud.com/articles/p-best-practices-for-designing-apple-watch-apps-with-swiftui-a-comprehensive-guide)  
31. Introducing Core Haptics | Documentation \- WWDC Notes, acessado em janeiro 23, 2026, [https://wwdcnotes.com/documentation/wwdcnotes/wwdc19-520-introducing-core-haptics/](https://wwdcnotes.com/documentation/wwdcnotes/wwdc19-520-introducing-core-haptics/)  
32. How to Create a Video With Audio-Reactive Haptic Feedback for iOS | by Jonatan Ortiz, acessado em janeiro 23, 2026, [https://medium.com/@jonataneduard/how-to-create-a-video-with-audio-reactive-haptic-feedback-for-ios-ios-13-using-corehaptics-cd0384412582](https://medium.com/@jonataneduard/how-to-create-a-video-with-audio-reactive-haptic-feedback-for-ios-ios-13-using-corehaptics-cd0384412582)  
33. 7+ iOS 18: Music Haptics Revolution & More\! \- oechsle.pe •, acessado em janeiro 23, 2026, [https://oemoda.oechsle.pe/music-haptics-ios-18/](https://oemoda.oechsle.pe/music-haptics-ios-18/)  
34. Case study: Crafting an audio-haptic experience with custom haptics | by Thuy Gia Nguyen, acessado em janeiro 23, 2026, [https://medium.com/design-bootcamp/case-study-crafting-an-audio-haptic-experience-with-custom-haptics-3035bb0132fb](https://medium.com/design-bootcamp/case-study-crafting-an-audio-haptic-experience-with-custom-haptics-3035bb0132fb)  
35. ZeroLu/awesome-gemini-ai \- GitHub, acessado em janeiro 23, 2026, [https://github.com/ZeroLu/awesome-gemini-ai](https://github.com/ZeroLu/awesome-gemini-ai)  
36. React-Three-Fiber: Enhancing Scene Quality with Drei \+ Performance Tips \- Medium, acessado em janeiro 23, 2026, [https://medium.com/@ertugrulyaman99/react-three-fiber-enhancing-scene-quality-with-drei-performance-tips-976ba3fba67a](https://medium.com/@ertugrulyaman99/react-three-fiber-enhancing-scene-quality-with-drei-performance-tips-976ba3fba67a)  
37. Performance Issues on Desktop and Mobile Devices Using GSAP with React-Three-Fiber, acessado em janeiro 23, 2026, [https://gsap.com/community/forums/topic/43299-performance-issues-on-desktop-and-mobile-devices-using-gsap-with-react-three-fiber/](https://gsap.com/community/forums/topic/43299-performance-issues-on-desktop-and-mobile-devices-using-gsap-with-react-three-fiber/)  
38. SwiftUI \+ Metal – Create special effects by building your own shaders \- YouTube, acessado em janeiro 23, 2026, [https://www.youtube.com/watch?v=EgzWwgRpUuw](https://www.youtube.com/watch?v=EgzWwgRpUuw)  
39. Lottie vs. Rive: Optimizing Mobile App Animation \- Callstack, acessado em janeiro 23, 2026, [https://www.callstack.com/blog/lottie-vs-rive-optimizing-mobile-app-animation](https://www.callstack.com/blog/lottie-vs-rive-optimizing-mobile-app-animation)  
40. Rive vs Lottie: Which Animation Tool Should You Use in 2025? \- DEV Community, acessado em janeiro 23, 2026, [https://dev.to/uianimation/rive-vs-lottie-which-animation-tool-should-you-use-in-2025-p4m](https://dev.to/uianimation/rive-vs-lottie-which-animation-tool-should-you-use-in-2025-p4m)  
41. Rive vs Lottie, acessado em janeiro 23, 2026, [https://rive.app/blog/rive-as-a-lottie-alternative](https://rive.app/blog/rive-as-a-lottie-alternative)  
42. Battery usage: DOM vs Canvas vs WebGL : r/webdev \- Reddit, acessado em janeiro 23, 2026, [https://www.reddit.com/r/webdev/comments/1fdv843/battery\_usage\_dom\_vs\_canvas\_vs\_webgl/](https://www.reddit.com/r/webdev/comments/1fdv843/battery_usage_dom_vs_canvas_vs_webgl/)  
43. 100 Three.js Best Practices (2026) \- Utsubo, acessado em janeiro 23, 2026, [https://www.utsubo.com/blog/threejs-best-practices-100-tips](https://www.utsubo.com/blog/threejs-best-practices-100-tips)  
44. React Three Fiber Performance Optimization : r/threejs \- Reddit, acessado em janeiro 23, 2026, [https://www.reddit.com/r/threejs/comments/1jffyit/react\_three\_fiber\_performance\_optimization/](https://www.reddit.com/r/threejs/comments/1jffyit/react_three_fiber_performance_optimization/)  
45. 18 Predictions for 2026 \- UX Tigers, acessado em janeiro 23, 2026, [https://www.uxtigers.com/post/2026-predictions](https://www.uxtigers.com/post/2026-predictions)  
46. Enhance Your React Components /w a Glossy Shine Effect \- DEV ..., acessado em janeiro 23, 2026, [https://dev.to/mike-at-redspace/enhance-your-react-components-w-a-glossy-shine-effect-5ejo](https://dev.to/mike-at-redspace/enhance-your-react-components-w-a-glossy-shine-effect-5ejo)  
47. Awesome CSS Text Animation Examples You Can Use \- Slider Revolution, acessado em janeiro 23, 2026, [https://www.sliderrevolution.com/resources/css-text-animation/](https://www.sliderrevolution.com/resources/css-text-animation/)  
48. Classic foundations. Future-forward execution. Convert visits into projects. \- Aura Build, acessado em janeiro 23, 2026, [https://www.aura.build/s/VRP3J5F](https://www.aura.build/s/VRP3J5F)

# **The Rendered Frontier: Architecting the Post-DOM Web**

## **1\. The Paradigm Shift: Beyond the Document Object Model**

The contemporary web has calcified into a predictable, sanitized artifact of corporate utility. The domination of the "Clean Corporate" aesthetic—characterized by vast sterile whitespace, predictable typography, and the ubiquitous, non-threatening "smooth scrolling" of libraries like Lenis—represents a fundamental stagnation of the medium. This aesthetic, optimized for conversion funnels and accessibility audits, treats the browser as a glorified document reader. It relies on the Document Object Model (DOM) as its primary structural scaffolding, manipulating divs and spans via CSS transforms in a way that is fundamentally limited by the CPU's single-threaded layout engine. For the avant-garde creative technologist, this approach is obsolete. The "Experimental" category of the FWA and Awwwards demands a rejection of the document metaphor in favor of the simulation metaphor. We are not building pages; we are architecting worlds.

The true frontier of digital experience lies in the complete abstraction of the browser as a high-performance render target. This shift necessitates a move away from declarative markup and toward imperative, mathematical generation. The canvas element is no longer a container for images but a viewport into a procedurally generated reality, rendered in real-time by the Graphics Processing Unit (GPU). In this paradigm, the pixel is the only truth. Every visual element—from the typography to the background to the user interface itself—is the result of a per-pixel or per-vertex calculation executed thousands of times per second.

This report outlines the technical architecture required to achieve this "High-End Demoscene" aesthetic in a browser context. It explores interaction models that are technically extreme, relying on advanced fields such as Signed Distance Fields (SDFs), General-Purpose Computing on GPUs (GPGPU), Computational Fluid Dynamics (CFD), and non-linear spatial navigation. The objective is to produce work that defies the viewer's understanding of the browser's capabilities, eliciting the question: "How the hell was this rendered?" The methodologies described herein utilize the raw power of WebGL and WebGPU, treating libraries like react-three-fiber, ogl, and regl merely as the scaffolding upon which complex custom shaders are erected.

### **1.1 The GPU as the Primary Actor**

The fundamental distinction between standard web design and the experimental work described here is the locus of computation. In a standard web application, the CPU handles layout, logic, and state management, dispatching draw calls to the GPU only for final compositing. In a high-end WebGL/WebGPU application, the CPU is relegated to a coordinator role, while the heavy lifting of simulation, physics, and rendering logic occurs on the GPU.1 This inversion allows for the simulation of millions of particles, complex fluid dynamics, and raymarched geometries that would be impossible on the CPU. The shift from the fixed-function pipeline of early OpenGL to the programmable pipeline of modern shaders (Vertex, Fragment, and Compute) is the enabler of this artistic revolution.

## ---

**2\. Advanced Shader Art: The Mathematical Interface**

The rejection of the DOM implies the rejection of standard geometric primitives. We do not construct interfaces out of pre-modeled triangles; we carve them out of mathematical space using Raymarching and Signed Distance Fields (SDFs).

### **2.1 Raymarching and Signed Distance Fields (SDFs)**

Raymarching, specifically the Sphere Tracing algorithm, represents a fundamental alternative to traditional rasterization. While rasterization projects 3D vertices onto a 2D screen, raymarching effectively "scans" the 3D volume pixel by pixel.2 This technique allows for the representation of infinite detail, organic blending, and constructive solid geometry (CSG) in real-time, features that are mathematically impossible with standard polygonal meshes.

#### **2.1.1 The Mathematics of Sphere Tracing**

At the core of this technique is the Signed Distance Function (SDF). An SDF, denoted as ![][image1], takes a point ![][image2] in 3D space and returns the shortest distance to the surface of an object. Crucially, this distance is signed: a negative value indicates the point is inside the object, while a positive value indicates it is outside.3 The "surface" is implicitly defined as the set of points where ![][image3].

The rendering loop operates within the fragment shader. For every pixel on the screen, a ray is cast from the camera origin ![][image4] in the direction ![][image5]. Instead of solving a complex intersection equation (as in analytical raytracing), the algorithm iterates in discrete steps. At each step ![][image6], the algorithm evaluates the SDF at the current point ![][image7]. The returned distance ![][image8] represents the radius of the largest sphere that can be placed at ![][image7] without intersecting any geometry. The algorithm then safely advances the ray by this distance ![][image8]:

![][image9]  
This process repeats until ![][image10] (a hit) or the total distance traveled exceeds a maximum draw distance.4 This method is incredibly robust, allowing for the rendering of mathematically precise surfaces without the tessellation artifacts associated with polygonal meshes.

#### **2.1.2 Constructive Solid Geometry and Organic UI**

The true power of SDFs lies in Boolean operations. Because shapes are defined by distance values, combining them is a matter of simple arithmetic operations on those distances.

* **Union:** The union of two shapes is the minimum distance to either shape: ![][image11].  
* **Intersection:** The intersection is the maximum distance: ![][image12].  
* **Subtraction:** Subtraction is the intersection of the first shape and the inverse of the second: ![][image13].2

However, the "avant-garde" aesthetic demands more than hard edges. The **Smooth Minimum** function (smin) allows shapes to blend together organically, behaving like liquid mercury. This is achieved by replacing the standard min function with a polynomial approximation that interpolates between the two distances when they are close.

![][image14]  
Here, ![][image15] controls the "stickiness" or blending radius. This allows for UI elements that do not just pop into existence but grow and merge with the environment, creating a biological interface that feels alive.2

#### **2.1.3 Domain Warping and Infinite Repetition**

To create the "Infinite Canvas" effect often sought in experimental navigation, we manipulate the coordinate space (the domain) before evaluating the SDF.

* **Infinite Repetition:** By applying the modulo operator to the position vector ![][image2] before passing it to the SDF (e.g., p.xz \= mod(p.xz, 2.0) \- 1.0), we fold space such that a single object is evaluated infinitely across the grid.7 This comes at virtually no additional computational cost, allowing for the rendering of infinite cities or landscapes.  
* **Domain Warping:** We can twist, bend, and distort the space itself by applying transformation matrices or noise functions to ![][image2]. For example, a twist effect is achieved by rotating the point ![][image2] around the Y-axis by an angle dependent on its height ![][image16].8 By driving these distortions with time-dependent variables or audio inputs, the entire UI can writhe and breathe.

### **2.2 Compute Shaders and GPGPU Simulation**

The transition from WebGL to WebGPU marks a critical evolution in browser-based art. While WebGL forces developers to map general computation onto graphics primitives (textures and fragments), WebGPU introduces **Compute Shaders**, which provide a generic programming model for parallel processing on the GPU.1 This allows for the simulation of autonomous agents (Boids) and complex systems at a scale of millions of entities.

#### **2.2.1 Boids and Flocking Simulations**

The classic Boids algorithm simulates flocking behavior via three simple rules: Separation, Alignment, and Cohesion.11

* **Separation:** Steer to avoid crowding local flockmates.  
* **Alignment:** Steer towards the average heading of local flockmates.  
* **Cohesion:** Steer to move toward the average position (center of mass) of local flockmates.12

In a CPU implementation, comparing every boid to every other boid results in ![][image17] complexity, capping performance at a few thousand particles. A WebGPU Compute Shader approach changes this paradigm.

**Spatial Hashing and Bitonic Sort:** To simulate 1 million+ particles, we employ a **Spatial Hash** or Grid acceleration structure.11 The simulation space is divided into a grid.

* **Hash Calculation:** A compute shader kernel calculates a cell index (hash) for every particle based on its position.  
* **Sort:** The particles are sorted by this hash index using a parallel **Bitonic Sort** algorithm on the GPU. This groups particles in the same spatial cell together in memory.13  
* **Neighbor Lookup:** When updating a particle, the compute shader only needs to query the particles in its own cell and the 26 adjacent cells (in 3D). This reduces the algorithmic complexity to effectively ![][image18], where ![][image15] is the average density of a cell.

The result is a fluid, living cloud of geometry that can form complex shapes or typography and disperse instantly under the influence of a cursor-driven force field.14

#### **2.2.2 Reaction-Diffusion Systems**

Reaction-Diffusion models, such as the **Gray-Scott** algorithm, simulate the interaction of two chemical substances that diffuse at different rates. This process generates Turing patterns—spots, stripes, and labyrinths reminiscent of coral growth or fingerprints.16

The governing partial differential equations are:

![][image19]  
![][image20]  
**Compute Implementation:** Unlike WebGL, which requires "ping-ponging" between two framebuffers (reading from Texture A and writing to Texture B), WebGPU allows for the use of **Storage Buffers** or Storage Textures.18

* **Laplacian Operator:** The shader calculates the discrete Laplacian ![][image21] (diffusion) by sampling the concentration of chemicals in the neighboring pixels (using a 3x3 or 5x5 convolution kernel).17  
* **Reaction Update:** The reaction terms (![][image22]) and feed/kill rates are applied to update the concentrations.  
* **User Interaction:** By mapping the mouse position to the grid, we can inject chemical B into the system, causing the pattern to "grow" organically from the cursor trail. This creates a UI where the background is not a static image but a biological computation responding to user agency.19

## ---

**3\. Computational Fluid Dynamics: The Interface as Continuum**

Standard web interfaces treat elements as rigid bodies. A technically extreme interface treats the screen as a fluid medium. By solving the Navier-Stokes equations in real-time, we can create interactions where the user does not merely point and click, but stirs and disturbs the digital atmosphere.

### **3.1 Navier-Stokes Fluid Simulation**

The Navier-Stokes equations for incompressible flow describe the motion of fluid substances:

![][image23]  
![][image24]  
Here, ![][image25] is the velocity field, ![][image2] is pressure, ![][image26] is density, ![][image27] is viscosity, and ![][image28] represents external forces.21

**The Stable Fluids Algorithm:** Solving these equations directly is computationally expensive. For real-time graphics, we use Jos Stam's "Stable Fluids" approach, implemented via a series of fragment shader passes.22

* **Advection:** This step moves the fluid (both velocity and dye) along the velocity field. Instead of pushing fluid forward (which is unstable), we trace the velocity vector backwards in time from the current pixel to find where the fluid came from: ![][image29].24  
* **Diffusion:** Viscous diffusion is simulated by solving a Poisson equation, blurring the velocity field. In many artistic applications, this is skipped or approximated by the implicit diffusion of the advection step's interpolation.  
* **External Forces:** User input (mouse movement) is added to the velocity field as an external force ![][image28].  
* **Pressure Projection (Divergence Cleanup):** The advection step often creates "divergence"—areas where fluid is created or destroyed, violating the incompressibility condition (![][image30]). To fix this, we calculate the divergence of the field and then solve for a pressure field that counteracts it. This requires solving a large system of linear equations, typically done using the **Jacobi Iteration** or **Gauss-Seidel** method on the GPU.21  
* **Gradient Subtraction:** Finally, the gradient of the pressure field is subtracted from the velocity field, ensuring the result is divergence-free (swirly and mass-conserving).

The resulting velocity texture can be used to distort any DOM element, image, or text, creating the illusion that the content is floating on the surface of water.25

### **3.2 Soft Body Physics and Vertex Displacement**

While fluid dynamics handle continuous media, Soft Body Physics handles discrete deformable objects. In the browser, simulating jelly-like buttons or typographic elements is best handled via **Vertex Displacement Shaders**, avoiding the overhead of CPU physics engines like Cannon.js for visual-only effects.26

**Mass-Spring Approximation in Shaders:**

We treat the mesh (e.g., a sphere or high-density plane) as a system of masses connected by springs.

* **Vertex Shader Logic:** Each vertex has a "rest position." When an external force (like a raycasted mouse cursor) approaches, a repulsion vector is calculated.  
* **Hooke's Law:** The vertex is pushed away from the cursor, but a spring force pulls it back toward its rest position.  
* **Damping and Oscillation:** To simulate the "jiggle" of gelatin, we modulate the displacement with a time-decaying sine wave based on the distance to the impact point:  
  ![][image31]  
  This creates a ripple effect that propagates through the object surface.28

This technique allows for "magnetic" buttons that not only attract the cursor but deform and squish under its influence, providing a tactile feedback loop absent in standard CSS transitions.29

### **3.3 Cloth Simulation and Verlet Integration**

Simulating fabric—whether for a hero image that drapes like a curtain or text that folds in the wind—requires a robust physics integration method. **Verlet Integration** is preferred in graphics for its stability and computational efficiency.30

**The Verlet Algorithm:**

Instead of storing velocity explicitly, Verlet integration calculates the new position based on the current and previous positions:

![][image32]  
Velocity is implicitly defined as ![][image33].

**Constraint Solving:**

The cloth is modeled as a grid of particles connected by distance constraints (structural springs).

* **Iterative Relaxation:** For every frame, we iterate through all constraints multiple times (e.g., 16 iterations). For each constraint between particle A and particle B, we calculate the distance. If the distance deviates from the resting length, we move both particles closer together or further apart to satisfy the constraint.  
* **GPU Implementation:** This can be parallelized in a Compute Shader or using a "ping-pong" texture approach where particle positions are stored in RGBA float textures. The constraint solving step is performed by sampling neighboring pixels (particles) and adjusting the current pixel's position accordingly.31

## ---

**4\. Post-Processing and Glitch Aesthetics: The Artifact as Art**

The "Clean Corporate" web tries to hide the digital nature of the medium. The "Experimental" web exposes and fetishizes it. Post-processing effects act as a filter over the rendered scene, introducing errors, artifacts, and aberrations that simulate broken hardware or data corruption.

### **4.1 Datamoshing and Motion Vectors**

Datamoshing is an aesthetic derived from video compression artifacts, specifically the corruption of motion compensation data. To simulate this in real-time WebGL, we manipulate the **Motion Vectors** of the scene.33

**Shader Implementation:**

* **Motion Vector Buffer:** We render a separate pass that stores the screen-space velocity of every pixel. The Red channel stores the X velocity, and the Green channel stores the Y velocity.  
* **Feedback Loop:** We use a technique called "Texture Feedback." Instead of clearing the framebuffer every frame, we draw the result of the previous frame back onto the screen.  
* **Displacement:** In the feedback pass, we sample the previous frame's texture, but we displace the texture coordinates (uv) by the value stored in the Motion Vector buffer.  
  ![][image34]  
* **Glitch Injection:** By deliberately under-sampling or adding noise to the motion vectors, or by effectively "pausing" the background update while moving the foreground, we create the "melting" effect where pixels are dragged along by moving objects, creating a smear of digital sludge.35

### **4.2 Chromatic Aberration and Spectral Dispersion**

Standard chromatic aberration (simply shifting the Red and Blue channels) is a cliché. High-end implementations simulate **Spectral Dispersion**, modeling the physical property of refractive indices varying by wavelength.36

**Technique:**

The post-processing shader samples the scene texture multiple times (e.g., 8-16 samples) for each pixel.

* **Radial Distortion:** The sampling coordinates are pushed away from the center of the screen to simulate lens curvature (Barrel Distortion).  
* **Wavelength Offset:** The amount of distortion is modulated by the color channel. The Red channel is distorted less than the Blue channel, simulating the behavior of a prism.  
  ![][image35]  
* **Blur:** The samples are weighted and summed, creating a natural radial blur at the edges of the screen that mimics high-end (or flawed) optical glass.37

### **4.3 ASCII and Matrix Rendering**

Rendering a 3D scene as text characters re-contextualizes the visuals as "raw data," evoking a retro-futurist hacker aesthetic.

**Technique:**

* **Downsampling:** The scene is rendered to a low-resolution off-screen framebuffer (e.g., width / 8, height / 16).  
* **Luminance Mapping:** The fragment shader calculates the luminance (brightness) of each pixel in the low-res buffer.  
* **Character Atlas:** A Texture Atlas containing a monospaced font is loaded. The characters are ordered by density (e.g., .:-=+\*\#%@).  
* **Glyph Selection:** The shader maps the luminance to an index in the character set. It then calculates the UV coordinates for that specific character in the atlas.  
  ![][image36]  
* **Colorization:** The character is tinted by the original pixel color, allowing for full-color ASCII video or 3D rendering.39

## ---

**5\. Non-Linear Navigation: Spatial Architectures**

The vertical scroll is a tyranny of the past. To build a "Browser-based Art Installation," we must break the linear narrative and place the user in an infinite, non-Euclidean space.

### **5.1 The Infinite Canvas and Floating Point Precision**

An infinite canvas allows the user to pan in any direction forever. However, this introduces the **Floating Point Precision** problem. WebGL uses 32-bit floating-point numbers (float32). As the camera moves far from the origin (e.g., coordinates ![][image37]), the precision of the float decreases, leading to "jittery" vertex rendering (Z-fighting and vertex wobbling).42

**The Floating Origin Solution:**

To solve this, we implement a "Floating Origin" system.

* **Threshold Check:** In the render loop, we check if the camera's position magnitude exceeds a certain threshold.  
* **Re-centering:** If it does, we subtract the camera's current position from the camera itself and *every object* in the scene graph. The camera effectively snaps back to ![][image38], but the relative distances remain identical.  
* **Seamlessness:** This operation happens in a single frame, invisibly to the user, allowing for truly infinite navigation without precision loss.

**Quadtrees for Spatial Indexing:**

To manage performance on an infinite plane with potentially thousands of objects, we use a **Quadtree** data structure.

* The world is recursively divided into four quadrants.  
* **Frustum Culling:** We query the Quadtree to find which nodes intersect with the camera's view frustum.  
* **Draw Calls:** Only objects within the visible nodes are submitted to the GPU render list. This ensures that even if the canvas contains millions of items, we only pay the cost for what is currently visible.44

### **5.2 Portal Rendering and Stencil Buffers**

Portals allow for non-Euclidean geometry—windows that look into other dimensions or physically impossible spaces (e.g., a room that is larger on the inside).

**Stencil Buffer Implementation:**

* **Stencil Pass:** We first render the "portal window" geometry (e.g., a quad) to the **Stencil Buffer** only. We set the stencil value to 1 for pixels covered by the portal. We disable writing to the Color and Depth buffers.  
* **Scene A (Outer World):** We render the outer world normally, but with a Stencil Test that only passes if stencil\!= 1\. This prevents the outer world from drawing over the portal.  
* **Scene B (Inner World):** We clear the Depth buffer (but not the Stencil buffer). We then render the "inner" world, but with a Stencil Test that only passes if stencil \== 1\. This clips the inner world exactly to the shape of the portal window.  
* **Camera Matrix:** Crucially, the camera for the inner world must be transformed relative to the portal's view. If the user looks into the portal from an angle, the inner camera must be rotated and translated to match the perspective.47

This technique, when combined with recursive rendering (rendering a portal inside a portal), allows for "Hall of Mirrors" effects and seamless transitions between completely different 3D scenes.

## ---

**6\. Synesthetic Inputs: Audio-Reactive Systems**

Audio reactivity must transcend simple pre-baked loops. It requires the real-time analysis of audio data to drive simulation parameters.

### **6.1 FFT Analysis and Shader Uniforms**

The Web Audio API's AnalyserNode provides access to the Fast Fourier Transform (FFT) data of an audio source.50

**Data Pipeline:**

* **Frequency Data:** We extract the frequency spectrum using analyser.getByteFrequencyData(). This gives us an array of 0-255 values representing the amplitude of different frequency bands (Bass, Mids, Treble).  
* **Texture Upload:** Uploading this array as a uniform array is expensive if the array is large. Instead, we write the data into a **Data Texture** (e.g., a 1x1024 pixel texture).  
* **Shader Sampling:** In the Vertex or Fragment shader, we sample this texture based on the uv coordinates.  
  * texture(uAudioTexture, vec2(0.1, 0.0)) samples the low-end bass frequencies.  
  * texture(uAudioTexture, vec2(0.9, 0.0)) samples the high-end treble frequencies.

**Applications:**

* **Vertex Displacement:** Map bass frequencies to the displacement magnitude of a mesh, causing it to pulse with the kick drum.  
* **Domain Warping:** Use the mid-range frequencies to drive the rotation angle in a domain warping function, causing the entire SDF world to twist with the melody.51  
* **Particle Force:** In a Compute Shader boid simulation, use the total volume (RMS) to modulate the "Separation" force, causing the flock to explode outward on loud beats.

## ---

**7\. The Future Stack: WebGPU and AI**

The edge of the experimental web is currently defined by the integration of AI rendering techniques directly into the browser pipeline.

### **7.1 Gaussian Splatting**

**Gaussian Splatting** is a rasterization technique for rendering photorealistic scenes captured from the real world. Unlike meshes (which struggle with complex foliage/hair) or NeRFs (which are computationally heavy raymarching), Splatting represents the scene as millions of 3D Gaussian blobs.53

**Implementation:** Libraries like antimatter15/splat render these splats by sorting them back-to-front (using Bitonic sort on the GPU) and rasterizing them as quads with a Gaussian alpha falloff. This allows for the display of captured real-world art installations with photorealistic lighting and reflections at 60fps in the browser, a feat previously impossible.54

### **7.2 WebNN and Generative Shaders**

The **Web Neural Network API (WebNN)** allows browsers to access on-device AI accelerators (NPUs). This opens the door for:

* **Real-Time Style Transfer:** Processing a webcam feed through a MobileNet model to apply an artistic style before using it as a texture in a WebGL scene.56  
* **Generative UI:** Using local LLMs (like WebLLM) to generate GLSL shader code on the fly based on user prompts, effectively creating an interface that dreams itself into existence.58

## **8\. Conclusion**

To build for the "Experimental" category is to reject the safety of the known. It is to embrace the chaotic potential of the GPU. By leveraging Raymarching to build mathematical worlds, Compute Shaders to simulate artificial life, Fluid Dynamics to liquefy the interface, and Spatial Architectures to break linear navigation, we create experiences that are not merely "websites" but autonomous digital entities. The code required is heavy on vector calculus and matrix algebra, relying on the raw truth of the shader over the abstraction of the DOM. This is the architecture of the post-DOM web.

### **Table 1: Technical Comparison of Interaction Models**

| Feature | Standard Web 2.0 | Experimental / Avant-Garde | Technical Requirement |
| :---- | :---- | :---- | :---- |
| **Geometry** | DOM Elements, SVGs | SDFs, Implicit Surfaces, Splats | Raymarching, GLSL Math |
| **Animation** | CSS Keyframes, Tweens | Physics Simulations, Procedural Noise | Verlet Integration, Noise Algorithms |
| **User Input** | Click, Hover, Scroll | Force Fields, Fluid Displacement | Raycasting, GPGPU Compute |
| **Navigation** | Vertical Scroll | Infinite Canvas, Z-Axis, Portals | Spatial Hashing, Stencil Buffers |
| **Visuals** | Static Images, Videos | Generative, Reaction-Diffusion | Fragment Shaders, Ping-Pong Buffers |
| **Physics** | None or Basic Easing | Soft Body, Cloth, Fluid Dynamics | Vertex Displacement, Navier-Stokes |

*(End of Report)*

---

**Citations:**

1

#### **Referências citadas**

* WebGPU API \- MDN Web Docs \- Mozilla, acessado em fevereiro 2, 2026, [https://developer.mozilla.org/en-US/docs/Web/API/WebGPU\_API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)  
* An Introduction to Raymarching \- Maxime Garcia, acessado em fevereiro 2, 2026, [https://typhomnt.github.io/teaching/ray\_tracing/raymarching\_intro/](https://typhomnt.github.io/teaching/ray_tracing/raymarching_intro/)  
* Ray Marching and Signed Distance Functions \- Jamie Wong, acessado em fevereiro 2, 2026, [https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/](https://jamie-wong.com/2016/07/15/ray-marching-signed-distance-functions/)  
* Ray Marching and Signed Distance Fields \- University of Cambridge, acessado em fevereiro 2, 2026, [https://www.cl.cam.ac.uk/teaching/1819/FGraphics/1.%20Ray%20Marching%20and%20Signed%20Distance%20Fields.pdf](https://www.cl.cam.ac.uk/teaching/1819/FGraphics/1.%20Ray%20Marching%20and%20Signed%20Distance%20Fields.pdf)  
* Implementation of raymarching surfaces in GLSL \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/23329384/implementation-of-raymarching-surfaces-in-glsl](https://stackoverflow.com/questions/23329384/implementation-of-raymarching-surfaces-in-glsl)  
* Signed Distance Functions (SDF's) for the Playdate, acessado em fevereiro 2, 2026, [https://devforum.play.date/t/signed-distance-functions-sdfs-for-the-playdate/16278](https://devforum.play.date/t/signed-distance-functions-sdfs-for-the-playdate/16278)  
* Mastering GLSL in TouchDesigner, Lesson 5: Domain Manipulation \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=tZBd7hvB0v8](https://www.youtube.com/watch?v=tZBd7hvB0v8)  
* Vertex Shader Domain Warping with Automatic Differentiation \- Dave Pagurek, acessado em fevereiro 2, 2026, [https://www.davepagurek.com/programming/shader-domain-warping/](https://www.davepagurek.com/programming/shader-domain-warping/)  
* Vertex Shader Domain Warping with Automatic Differentiation \- Dave Pagurek, acessado em fevereiro 2, 2026, [https://www.davepagurek.com/content/images/2024/05/Vertex\_Shader\_Domain\_Warping.pdf](https://www.davepagurek.com/content/images/2024/05/Vertex_Shader_Domain_Warping.pdf)  
* WebGPU from WebGL, acessado em fevereiro 2, 2026, [https://webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl.html](https://webgpufundamentals.org/webgpu/lessons/webgpu-from-webgl.html)  
* jtsorlinis/BoidsWebGPU \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/jtsorlinis/BoidsWebGPU](https://github.com/jtsorlinis/BoidsWebGPU)  
* Boids Flocking Simulation with Three.js & React \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=WepzbxlYROs](https://www.youtube.com/watch?v=WepzbxlYROs)  
* An Order of Magnitude More Boids: Optimizing Flocking Simulations \- Mark Tensen, acessado em fevereiro 2, 2026, [https://marktension.nl/blog/order-of-magnitude-boids/](https://marktension.nl/blog/order-of-magnitude-boids/)  
* Need help with flocking boids simulation with shaders : r/threejs \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/threejs/comments/10ebz0n/need\_help\_with\_flocking\_boids\_simulation\_with/](https://www.reddit.com/r/threejs/comments/10ebz0n/need_help_with_flocking_boids_simulation_with/)  
* Compute Boids / AntV \- Observable, acessado em fevereiro 2, 2026, [https://observablehq.com/@antv/compute-boids](https://observablehq.com/@antv/compute-boids)  
* Mitosis in the Gray-Scott model : writing shader-based chemical simulations, acessado em fevereiro 2, 2026, [https://pierre-couy.dev/simulations/2024/09/gray-scott-shader.html](https://pierre-couy.dev/simulations/2024/09/gray-scott-shader.html)  
* Gray-Scott Reaction Diffusion in TouchDesigner (Part 1\) \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=1k\_uPHcV6BA](https://www.youtube.com/watch?v=1k_uPHcV6BA)  
* Reaction-Diffusion Compute Shader in WebGPU \- Codrops, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/](https://tympanus.net/codrops/2024/05/01/reaction-diffusion-compute-shader-in-webgpu/)  
* jasonwebb/reaction-diffusion-playground: Interactive reaction-diffusion simulation with organic patterns and behaviors that emerge from the interactions of two chemicals mixed together. \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/jasonwebb/reaction-diffusion-playground](https://github.com/jasonwebb/reaction-diffusion-playground)  
* 4.2 Reaction Diffusion \- WebGPU Unleashed: A Practical Tutorial, acessado em fevereiro 2, 2026, [https://shi-yan.github.io/webgpuunleashed/Compute/reaction\_diffusion.html](https://shi-yan.github.io/webgpuunleashed/Compute/reaction_diffusion.html)  
* Fluid Simulation (with WebGL demo) \- Jamie Wong, acessado em fevereiro 2, 2026, [https://jamie-wong.com/2016/08/05/webgl-fluid-simulation/](https://jamie-wong.com/2016/08/05/webgl-fluid-simulation/)  
* jojolebarjos/fluid-simulation: WebGL implementation of Navier-Stokes equations \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/jojolebarjos/fluid-simulation](https://github.com/jojolebarjos/fluid-simulation)  
* Navier-Stokes, acessado em fevereiro 2, 2026, [https://piellardj.github.io/navier-stokes-webgl/](https://piellardj.github.io/navier-stokes-webgl/)  
* Understanding Fluid Simulation | Navier-Stokes GPU Implementation, acessado em fevereiro 2, 2026, [https://marvyn.com/blog/fluid-simulation.html](https://marvyn.com/blog/fluid-simulation.html)  
* OGL WebGL Library, acessado em fevereiro 2, 2026, [https://oframe.github.io/ogl/examples/?src=post-fluid-distortion.html](https://oframe.github.io/ogl/examples/?src=post-fluid-distortion.html)  
* Vertex displacement with shaders — Godot Engine (3.0) documentation in English, acessado em fevereiro 2, 2026, [https://docs.godotengine.org/en/3.0/tutorials/3d/vertex\_displacement\_with\_shaders.html](https://docs.godotengine.org/en/3.0/tutorials/3d/vertex_displacement_with_shaders.html)  
* Making a 2D soft-body physics engine | lisyarus blog, acessado em fevereiro 2, 2026, [https://lisyarus.github.io/blog/posts/soft-body-physics.html](https://lisyarus.github.io/blog/posts/soft-body-physics.html)  
* 2 Simple Vertex Displacement Shaders in ShaderGraph | Unity Tutorial \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=MbD6ZTupmws](https://www.youtube.com/watch?v=MbD6ZTupmws)  
* Why would you use a soft body over a vertex shader? : r/gamedev \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/gamedev/comments/1agxwnb/why\_would\_you\_use\_a\_soft\_body\_over\_a\_vertex\_shader/](https://www.reddit.com/r/gamedev/comments/1agxwnb/why_would_you_use_a_soft_body_over_a_vertex_shader/)  
* Verlet Integration and Cloth Physics Simulation \- Pikuma, acessado em fevereiro 2, 2026, [https://pikuma.com/blog/verlet-integration-2d-cloth-physics-simulation](https://pikuma.com/blog/verlet-integration-2d-cloth-physics-simulation)  
* A Verlet integration cloth simulation created with JavaScript using WebGL (Three.js) \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/RobertoLovece/Cloth](https://github.com/RobertoLovece/Cloth)  
* Cloth simulator using OpenGL : r/GraphicsProgramming \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/GraphicsProgramming/comments/1myl6zf/cloth\_simulator\_using\_opengl/](https://www.reddit.com/r/GraphicsProgramming/comments/1myl6zf/cloth_simulator_using_opengl/)  
* Datamoshing in TouchDesigner \- Part \#3 \- The Interactive & Immersive HQ, acessado em fevereiro 2, 2026, [https://interactiveimmersive.io/blog/glsl/datamoshing-in-touchdesigner-part-3/](https://interactiveimmersive.io/blog/glsl/datamoshing-in-touchdesigner-part-3/)  
* Liquidify Video, Live: Optical Flow GLSL Datamosh Technique \- CDM Create Digital Music, acessado em fevereiro 2, 2026, [https://cdm.link/liquidify-video-live-optical-flow-glsl-datamosh-technique/](https://cdm.link/liquidify-video-live-optical-flow-glsl-datamosh-technique/)  
* Creating Your Own Datamoshing Effect \- ompuco \- WordPress.com, acessado em fevereiro 2, 2026, [https://ompuco.wordpress.com/2018/03/29/creating-your-own-datamosh-effect/](https://ompuco.wordpress.com/2018/03/29/creating-your-own-datamosh-effect/)  
* Realistic lens distortion | Universe Chromatic Aberration by Maxon, acessado em fevereiro 2, 2026, [https://www.maxon.net/en/product-detail/red-giant/universe/chromatic-aberration](https://www.maxon.net/en/product-detail/red-giant/universe/chromatic-aberration)  
* Easy GLSL Chromatic Aberration in TouchDesigner \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=UoE1UOqFgLk](https://www.youtube.com/watch?v=UoE1UOqFgLk)  
* Chromatic Aberration | 3D Game Shaders For Beginners, acessado em fevereiro 2, 2026, [https://lettier.github.io/3d-game-shaders-for-beginners/chromatic-aberration.html](https://lettier.github.io/3d-game-shaders-for-beginners/chromatic-aberration.html)  
* Efecto: Building Real-Time ASCII and Dithering Effects with WebGL Shaders | Codrops, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/](https://tympanus.net/codrops/2026/01/04/efecto-building-real-time-ascii-and-dithering-effects-with-webgl-shaders/)  
* WebGL ASCII \- Offscreen Canvas, acessado em fevereiro 2, 2026, [https://offscreencanvas.com/issues/webgl-ascii/](https://offscreencanvas.com/issues/webgl-ascii/)  
* Creating real time video ASCII art using KickJS and WebGL | Morten Nobel's Blog, acessado em fevereiro 2, 2026, [https://blog.nobel-joergensen.com/2011/11/12/creating-real-time-video-ascii-art-using-kickjs-and-webgl/](https://blog.nobel-joergensen.com/2011/11/12/creating-real-time-video-ascii-art-using-kickjs-and-webgl/)  
* WebGL model view projection \- Web APIs | MDN, acessado em fevereiro 2, 2026, [https://developer.mozilla.org/en-US/docs/Web/API/WebGL\_API/WebGL\_model\_view\_projection](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection)  
* WebGL Precision Issues, acessado em fevereiro 2, 2026, [https://webglfundamentals.org/webgl/lessons/webgl-precision-issues.html](https://webglfundamentals.org/webgl/lessons/webgl-precision-issues.html)  
* Redesign Your Display List With Spatial Hashes | Envato Tuts+ \- Code, acessado em fevereiro 2, 2026, [https://code.tutsplus.com/redesign-your-display-list-with-spatial-hashes--cms-27586t](https://code.tutsplus.com/redesign-your-display-list-with-spatial-hashes--cms-27586t)  
* Lesson 8 \- Optimize performance | An infinite canvas tutorial \- antv.vision, acessado em fevereiro 2, 2026, [https://antv.vision/infinite-canvas-tutorial/guide/lesson-008](https://antv.vision/infinite-canvas-tutorial/guide/lesson-008)  
* Efficient (and well explained) implementation of a Quadtree for 2D collision detection, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/41946007/efficient-and-well-explained-implementation-of-a-quadtree-for-2d-collision-det](https://stackoverflow.com/questions/41946007/efficient-and-well-explained-implementation-of-a-quadtree-for-2d-collision-det)  
* Rendering Portals, acessado em fevereiro 2, 2026, [https://www.cs.rpi.edu/\~cutler/classes/advancedgraphics/S21/final\_projects/metzlr.pdf](https://www.cs.rpi.edu/~cutler/classes/advancedgraphics/S21/final_projects/metzlr.pdf)  
* opengl \- how to implement "portal rendering" \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/38287235/opengl-how-to-implement-portal-rendering](https://stackoverflow.com/questions/38287235/opengl-how-to-implement-portal-rendering)  
* Floating portals with React Three Fiber and Three.js \[ Tutorial part 3 \] \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=kv\_fx3PAEkQ](https://www.youtube.com/watch?v=kv_fx3PAEkQ)  
* Build a Music Visualizer with the Web Audio API \- Noisehack, acessado em fevereiro 2, 2026, [https://noisehack.com/build-music-visualizer-web-audio-api/](https://noisehack.com/build-music-visualizer-web-audio-api/)  
* Coding a 3D Audio Visualizer with Three.js, GSAP & Web Audio API \- Codrops, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-with-three-js-gsap-web-audio-api/](https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-with-three-js-gsap-web-audio-api/)  
* The magical world of Particles with React Three Fiber and Shaders \- Maxime Heckel's Blog, acessado em fevereiro 2, 2026, [https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/](https://blog.maximeheckel.com/posts/the-magical-world-of-particles-with-react-three-fiber-and-shaders/)  
* 3D Gaussian Splatting in Three.js \- Showcase, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/3d-gaussian-splatting-in-three-js/57858](https://discourse.threejs.org/t/3d-gaussian-splatting-in-three-js/57858)  
* How to Capture and Render a 3D Gaussian Splat in React Three Fiber \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=6tVcCTazmzo](https://www.youtube.com/watch?v=6tVcCTazmzo)  
* Implement gaussian splat of a room in the web : r/GaussianSplatting \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/GaussianSplatting/comments/1ip767c/implement\_gaussian\_splat\_of\_a\_room\_in\_the\_web/](https://www.reddit.com/r/GaussianSplatting/comments/1ip767c/implement_gaussian_splat_of_a_room_in_the_web/)  
* WebNN Overview | Microsoft Learn, acessado em fevereiro 2, 2026, [https://learn.microsoft.com/en-us/windows/ai/directml/webnn-overview](https://learn.microsoft.com/en-us/windows/ai/directml/webnn-overview)  
* style-transfer – SGI 2025, acessado em fevereiro 2, 2026, [https://summergeometry.org/sgi2025/tag/style-transfer/](https://summergeometry.org/sgi2025/tag/style-transfer/)  
* WebLLM | Home, acessado em fevereiro 2, 2026, [https://webllm.mlc.ai/](https://webllm.mlc.ai/)  
* WebLLM: A High-Performance In-Browser LLM Inference Engine \- MLC, acessado em fevereiro 2, 2026, [https://blog.mlc.ai/2024/06/13/webllm-a-high-performance-in-browser-llm-inference-engine](https://blog.mlc.ai/2024/06/13/webllm-a-high-performance-in-browser-llm-inference-engine)

# **Arquitetura de Comportamento Digital: Um Tratado Exaustivo sobre Engenharia de UI/UX, Psicologia Cognitiva e Otimização de Conversão em Ecossistemas Digitais**

## **Introdução: A Convergência entre Neurociência e Interface Digital**

A concepção contemporânea de interfaces digitais transcendeu a mera estética funcional ou a ergonomia básica. Em 2025, o design de produtos digitais — abrangendo aplicativos móveis, plataformas web, sistemas de checkout e paywalls — consolidou-se como uma disciplina de engenharia comportamental. O objetivo não é mais apenas permitir que o usuário execute uma tarefa, mas arquitetar o ambiente de escolha de tal forma que a decisão desejada (conversão) e o hábito de uso (retenção) sejam os caminhos de menor resistência cognitiva e maior recompensa emocional.

Este relatório técnico disseca a anatomia das interfaces de alta performance, fundamentando-se rigorosamente na interseção entre a psicologia cognitiva, a neurociência aplicada (neurodesign) e a análise de dados comportamentais. Examinaremos como as gigantes da tecnologia e as startups mais disruptivas utilizam vieses cognitivos, padrões de escaneamento visual e mecânicas de gamificação para moldar o comportamento humano em escala. A análise se estende desde a microfisiologia do movimento ocular em milissegundos até as macroestratégias de localização cultural em "Super Apps", fornecendo um compêndio exaustivo para a criação de produtos digitais que não apenas funcionam, mas convertem e retêm com eficácia científica.

## ---

**1\. Neurodesign e a Fisiologia da Primeira Impressão**

A eficácia de uma interface é frequentemente determinada antes mesmo de qualquer interação consciente ocorrer. O cérebro humano, operando sob o imperativo evolutivo de conservação de energia, realiza julgamentos rápidos e subconscientes sobre a segurança, a utilidade e a confiabilidade de um ambiente digital. O campo do Neurodesign estuda esses mecanismos automáticos para otimizar a recepção inicial do produto.

### **1.1. O Julgamento de 50 Milissegundos e a Estética da Confiança**

Estudos seminais e dados recentes de 2025 corroboram que a primeira impressão de um site ou aplicativo é formada em aproximadamente 50 milissegundos. Dentro dos primeiros 90 segundos de interação, até 90% do julgamento sobre o produto é baseado exclusivamente na cor e na harmonia visual.1 Este fenômeno, conhecido como "efeito halo estético", sugere que usuários percebem interfaces visualmente atraentes como mais utilizáveis e confiáveis, independentemente de sua funcionalidade real inicial.

A implicação para a conversão é direta: a estética não é decorativa; é um pré-requisito funcional para a confiança. Em setores de alta sensibilidade, como Fintechs e Saúde (HealthTechs), a ausência de uma hierarquia visual clara e de uma paleta de cores harmônica dispara o "sistema de detecção de ameaças" do cérebro (amígdala), aumentando o cortisol e a resistência à conversão.2 A confiança é construída em milissegundos através de sinais visuais de estabilidade e profissionalismo, elementos que devem ser priorizados acima da complexidade funcional no primeiro contato.

### **1.2. Carga Cognitiva e a Lei da Parcimônia Digital**

A "Carga Cognitiva" refere-se à quantidade total de esforço mental sendo usado na memória de trabalho. Em interfaces voltadas para a conversão, a carga cognitiva é inversamente proporcional à taxa de sucesso. O cérebro humano busca ativamente evitar o esforço cognitivo desnecessário (Lei do Menor Esforço).3 Portanto, interfaces que apresentam densidade excessiva de informações, navegação ambígua ou escolhas múltiplas simultâneas induzem a paralisia da análise.

Para combater isso, a estratégia dominante em 2025 é a "Clareza através da Simplificação".4 Isso não significa remover funcionalidades, mas aplicar a **Divulgação Progressiva** (*Progressive Disclosure*). Esta técnica envolve revelar informações e opções apenas quando o usuário precisa delas e tem capacidade de processá-las, em vez de sobrecarregar a tela inicial.5 Em formulários de checkout, por exemplo, isso se manifesta na divisão de longos questionários em etapas discretas e digeríveis, reduzindo a percepção de esforço e mantendo o usuário no fluxo de conversão.

### **1.3. Neuroestética: Minimalismo e Complexidade Visual**

O minimalismo visual continua sendo uma tendência robusta, mas sua aplicação evoluiu. O "espaço em branco" (white space) não é vazio; é um elemento ativo de design que reduz o ruído visual e direciona a atenção para os elementos de conversão (CTAs \- Calls to Action). A neuroestética sugere que o cérebro prefere simetria e equilíbrio, pois são mais fáceis de processar. Estilos visuais emergentes, como o *Glassmorphism* (que utiliza transparência e desfoque para criar profundidade) e o *Neumorphism* (que simula relevo tátil), são tentativas de reintroduzir a física do mundo real nas interfaces planas, ajudando o cérebro a distinguir camadas e hierarquias sem adicionar desordem visual.6

A aplicação correta desses estilos visuais melhora a "affordance" — a percepção intuitiva de que um elemento (como um botão) é clicável. Quando um botão parece ter volume ou está flutuando sobre a interface, ele "pede" para ser tocado, aumentando a taxa de cliques (CTR) através de uma sugestão visual subconsciente de interatividade.8

## ---

**2\. Psicologia das Cores: O Espectro Emocional da Conversão**

A cor é a variável mais influente na modulação emocional do usuário e na hierarquia visual. Longe de ser uma escolha puramente artística, a paleta de cores de uma interface de alta performance é uma ferramenta de engenharia psicológica projetada para evocar estados mentais específicos que favorecem a retenção e a venda.

### **2.1. O Mecanismo Biológico e Psicológico da Cor**

A resposta humana à cor é uma mistura de condicionamento biológico (evolução) e cultural. As cores de comprimento de onda longo (vermelho, laranja) são estimulantes físicos, aumentando a frequência cardíaca e a sensação de urgência, enquanto as cores de comprimento de onda curto (azul, verde) têm efeitos calmantes e estabilizadores.1

#### **Tabela de Aplicação Estratégica de Cores em UI (2025)**

| Cor | Significado Psicológico Primário | Aplicação em Conversão/Retenção | Setores Dominantes |
| :---- | :---- | :---- | :---- |
| **Azul** | Confiança, Segurança, Estabilidade, Lógica | Botões de ação primária (CTAs) onde o medo é uma barreira. Fundos de áreas seguras. | Fintech, Seguros, Saúde, Tech B2B.9 |
| **Vermelho** | Urgência, Perigo, Paixão, Erro | Notificações de erro, Badges de notificação (pontos), Ofertas de escassez/tempo limitado. | Varejo (Liquidação), Mídia (Breaking News), Dating Apps.1 |
| **Laranja** | Energia, Acessibilidade, Impulso, Amigável | CTAs de compra agressiva ("Compre Agora"). Cria alto contraste sem o alarme do vermelho. | E-commerce de baixo ticket, Startups, Gaming.10 |
| **Verde** | Sucesso, Crescimento, Permissão, Saúde | Feedback positivo, Validação de formulários, Botões de "Prosseguir", Dashboards financeiros. | Sustentabilidade, Apps de Investimento, Lifestyle.9 |
| **Preto/Cinza** | Luxo, Sofisticação, Exclusividade, Foco | Interfaces de alto padrão, Modo Escuro (retenção noturna). | Moda de Luxo, Streaming, Apps de Design.9 |

### **2.2. A Regra 60-30-10 e Harmonia Visual**

Para maximizar a conversão, a distribuição de cores deve seguir a regra de ouro do design de interiores e UI: 60% cor dominante (neutra, fundo), 30% cor secundária (marca, elementos de suporte) e 10% cor de destaque (exclusivamente para CTAs e pontos focais).1 Esta proporção garante que a cor de ação (geralmente uma cor quente ou saturada) não compita por atenção com o restante da interface. O "Efeito Von Restorff" (ou efeito de isolamento) prevê que o item que se destaca do contexto é o mais provável de ser lembrado e clicado. Portanto, um botão laranja só é eficaz se o restante da interface não for laranja.

### **2.3. O Papel do Contraste e Acessibilidade**

A legibilidade é fundamental para a retenção. O contraste entre o texto e o fundo não afeta apenas a acessibilidade para deficientes visuais, mas também a velocidade de leitura para todos os usuários. Interfaces com baixo contraste aumentam a carga cognitiva e a fadiga ocular, levando ao abandono.11 Em 2025, o "Modo Escuro" (Dark Mode) tornou-se um padrão de retenção, não apenas uma preferência estética. Para aplicativos de uso noturno ou prolongado (streaming, leitura, cripto), o modo escuro reduz a tensão ocular e economiza bateria em telas OLED, prolongando as sessões de uso e, consequentemente, a retenção.10

## ---

**3\. Hierarquia Visual e Padrões de Escaneamento Ocular**

Compreender como o olho humano percorre uma tela é essencial para posicionar estrategicamente os elementos de conversão. A leitura digital não é linear; é um processo de caça e captura de informações relevantes.

### **3.1. A Evolução dos Padrões: Do F ao Pinball**

Historicamente, em telas de desktop com muito texto, predominava o **Padrão em F** (leitura horizontal no topo, descendo verticalmente pela esquerda) e o **Padrão em Z** (movimento em ziguezague para páginas com menos conteúdo).13 No entanto, a hegemonia do mobile e a fragmentação da atenção geraram o **Padrão Pinball**.

No Padrão Pinball, observado em telas de resultados de busca (SERPs) e feeds de redes sociais, o olhar do usuário salta de forma não linear entre elementos de alto peso visual (imagens, números, palavras-chave em negrito), ignorando a sequência lógica.16 Isso exige que o design de interface abandone a estrutura de "bloco de texto" e adote uma estrutura modular, onde cada elemento deve ser capaz de capturar a atenção independentemente.

#### **Comparativo de Padrões de Escaneamento**

| Padrão | Contexto de Uso | Estratégia de Design para Conversão |
| :---- | :---- | :---- |
| **Padrão F** | Blogs, Artigos, Páginas de Texto Denso | Colocar palavras-chave e CTAs no início das linhas e nos primeiros parágrafos (Lead). |
| **Padrão Z** | Landing Pages, Homepages Simples | Posicionar logo no canto sup. esquerdo, proposta de valor no centro e CTA no canto inf. direito (ou final do Z). |
| **Diagrama de Gutenberg** | Páginas de Leitura Homogênea | Seguir a gravidade da leitura da esquerda p/ direita, terminando na "Área Terminal" (inf. direita) com a ação principal.18 |
| **Padrão Pinball** | Mobile, E-commerce, Feeds Sociais | Utilizar "ilhas de conteúdo" com forte hierarquia visual. O CTA deve ser recorrente ou fixo (sticky). |

### **3.2. Gaze Cueing: O Poder do Olhar Direcional**

Uma técnica de neuromarketing extremamente eficaz em landing pages é o "Gaze Cueing" (Dica do Olhar). Seres humanos têm um reflexo evolutivo de seguir o olhar de outros humanos. Se uma imagem de herói mostra uma pessoa olhando para o usuário, isso cria conexão emocional. No entanto, se a pessoa na imagem estiver olhando *para* o formulário de inscrição ou para o botão de CTA, a atenção do usuário é magneticamente atraída para esse elemento.20 Setas desenhadas à mão e linhas de conexão funcionam de maneira similar, servindo como pistas explícitas que guiam o olho através da dobra da página e em direção à conversão.22

### **3.3. Tipografia como Elemento Estrutural**

Em 2025, a tipografia "Bold" e distinta não é apenas uma escolha estilística, mas uma ferramenta de usabilidade. Títulos grandes e concisos (5-6 palavras) funcionam como ganchos de atenção no escaneamento rápido.13 A legibilidade em dispositivos móveis exige tamanhos de fonte generosos e entrelinhamento adequado para evitar o toque acidental e facilitar a leitura em movimento. A tipografia responsiva ajusta-se não apenas ao tamanho da tela, mas à distância de leitura, garantindo que a mensagem principal nunca seja perdida.23

## ---

**4\. Ergonomia Mobile e a Zona do Polegar (Thumb Zone)**

Com o aumento contínuo das dimensões dos smartphones (muitos excedendo 6,7 polegadas), a física do toque tornou-se um fator crítico de conversão. A facilidade com que um usuário pode alcançar um botão determina a probabilidade de interação.

### **4.1. Mapeamento da Zona do Polegar**

A pesquisa clássica de Steven Hoober, atualizada para os dispositivos de 2025, indica que cerca de 49% dos usuários operam seus telefones com apenas uma mão, utilizando o polegar para navegação.24 Isso cria zonas de calor ergonômicas distintas na tela.

* **Zona Natural (Inferior):** O arco de movimento natural do polegar. Aqui a precisão do toque é máxima e o esforço é mínimo. É o local obrigatório para CTAs de conversão, barras de navegação e ações frequentes.  
* **Zona de Estiramento (Meio):** Requer uma extensão do polegar, reduzindo a precisão. Adequada para conteúdo de visualização (scroll) mas não para ações críticas.  
* **Zona de Dor/Difícil (Superior):** Inacessível sem mudar a empunhadura do aparelho ou usar a segunda mão. Elementos colocados aqui (como o antigo menu hambúrguer no topo esquerdo) sofrem queda drástica de engajamento.25

### **4.2. Navegação: Hambúrguer vs. Tab Bar**

O debate sobre menus de navegação foi amplamente resolvido pelos dados de conversão. Menus ocultos ("Hambúrguer") têm taxas de descoberta significativamente menores do que menus visíveis. A **Barra de Navegação Inferior** (Bottom Tab Bar) ou barras de navegação "Sticky" são o padrão ouro para apps e sites móveis de alta performance.27 Estudos mostram que a substituição de um menu hambúrguer por uma barra de navegação inferior pode aumentar o engajamento nas seções principais, pois as opções estão sempre visíveis e ao alcance do polegar. O Spotify, por exemplo, aumentou os cliques de navegação em 30% ao remover o menu hambúrguer em favor de abas.28 Se o menu hambúrguer for inevitável (para opções secundárias), ele deve ser deslocado para a parte inferior da tela, ao alcance do polegar.

## ---

**5\. Vieses Cognitivos e Arquitetura de Decisão**

A "Arquitetura de Decisão" envolve estruturar a apresentação de opções para influenciar a tomada de decisão do usuário de forma previsível, utilizando atalhos mentais (heurísticas) e vieses cognitivos.

### **5.1. Escassez, Urgência e Aversão à Perda**

O princípio da **Aversão à Perda** (Loss Aversion) postula que a dor de perder é psicologicamente cerca de duas vezes mais poderosa que o prazer de ganhar.29 Interfaces de conversão exploram isso através de táticas de escassez e urgência.

* **Escassez de Quantidade:** "Apenas 2 itens restantes no estoque".  
* **Escassez de Tempo:** Contadores regressivos para ofertas ("A oferta expira em 10:00").  
* **Validação Social:** "15 pessoas estão vendo este hotel agora". Esses elementos criam um medo de perder a oportunidade (FOMO), acelerando a decisão do Sistema 1 (rápido, emocional) e inibindo a análise crítica do Sistema 2 (lento, lógico).29 Contudo, o uso ético é crucial; a falsa escassez pode ser detectada e destruir a confiança da marca a longo prazo.

### **5.2. Efeito Zeigarnik e Progresso Dotado**

O **Efeito Zeigarnik** afirma que tarefas incompletas permanecem ativas na memória, criando uma tensão cognitiva que impulsiona o usuário a buscar a conclusão.31 Interfaces de onboarding e checkouts utilizam barras de progresso para visualizar essa incompletude. A eficácia é amplificada pelo **Efeito do Progresso Dotado** (*Endowed Progress Effect*). Se um usuário recebe uma meta de 10 passos, ele é mais propenso a completá-la se a interface mostrar que ele já completou "automaticamente" os 2 primeiros passos (progresso de 20%), em comparação com uma barra de 8 passos começando do zero.33 O LinkedIn ("Seu perfil está 85% completo") e programas de fidelidade utilizam essa tática magistralmente para motivar o preenchimento de dados e a retenção.

### **5.3. Prova Social e Efeito Bandwagon**

Em situações de incerteza, os humanos olham para o comportamento dos outros para guiar suas ações (Efeito Manada ou Bandwagon). Elementos de confiança como avaliações de usuários, logotipos de empresas clientes ("Confiado por..."), e notificações de compras recentes ("Fulano acabou de comprar...") reduzem a percepção de risco. Em checkouts, selos de segurança e garantias explícitas atuam como "redutores de ansiedade" críticos.29

## ---

**6\. Otimização de Conversão (CRO) em Checkouts e Formulários**

O checkout é o ponto de maior fricção financeira e cognitiva. A otimização desta etapa é puramente focada na remoção de barreiras.

### **6.1. Fricção e Guest Checkout**

A barreira número um para a conversão em e-commerce é a exigência de criação de conta antes da compra. Dados indicam que o "Guest Checkout" (finalizar compra como convidado) é imperativo; forçar o cadastro causa abandono massivo de carrinho.38 A estratégia ideal é permitir a compra apenas com e-mail e dados de pagamento, e oferecer a criação de senha *após* a transação ser concluída ("Salve seus dados para a próxima vez"), transformando a conversão em cadastro sem fricção adicional.

### **6.2. Validação Inline vs. Pós-Submissão**

A validação de formulários deve ocorrer em tempo real. A **Validação Inline** fornece feedback imediato (ex: "Este e-mail é inválido" ou um "check" verde) logo após o usuário preencher um campo ou mudar o foco. Isso é superior à validação pós-submissão (ao clicar em "Enviar"), que força o usuário a revisar todo o formulário para encontrar erros, gerando frustração e abandono. O feedback positivo inline também atua como uma micro-recompensa, incentivando o progresso.40

### **6.3. Rótulos Flutuantes (Floating Labels)**

Para economizar espaço vertical em mobile, o padrão de "Floating Labels" (rótulos que começam dentro do campo como placeholder e flutuam para o topo quando o campo é ativado) tornou-se popular. Embora haja debates sobre legibilidade, quando bem implementados (com tamanho e contraste adequados), eles resolvem o problema do usuário esquecer o que está digitando (contexto) sem expandir excessivamente o comprimento do formulário, mantendo a interface limpa e scannable.43

### **6.4. Microcopy e Redução de Ansiedade**

O texto pequeno que acompanha os campos (Microcopy) tem impacto desproporcional. Explicar *por que* um dado é solicitado (ex: "Necessário para a nota fiscal" sob o campo de CPF) ou reforçar a segurança (ex: ícone de cadeado e texto "Transação Criptografada 256-bit" próximo ao botão de pagar) reduz a ansiedade de segurança e privacidade, aumentando a taxa de preenchimento.46

## ---

**7\. Retenção, Engajamento e o Modelo Hook**

A conversão é um evento; a retenção é um hábito. Para construir produtos que os usuários usam diariamente, utiliza-se o **Modelo Hook** (Gancho) de Nir Eyal, composto por quatro fases cíclicas: Gatilho, Ação, Recompensa Variável e Investimento.49

### **7.1. Gatilhos e Ação Simplificada**

O ciclo começa com gatilhos externos (notificações push, e-mails) que, com o tempo, devem se tornar gatilhos internos (emoções, tédio, hábito). Para que o gatilho leve à ação, a barreira de entrada deve ser mínima (Princípio da Ação Mínima). O Duolingo, por exemplo, pede apenas 3 minutos para uma lição, tornando a ação tão pequena que é difícil de recusar.49

### **7.2. Recompensas Variáveis e Dopamina**

O núcleo da formação de hábito é a **Recompensa Variável**. O cérebro libera dopamina não na recompensa em si, mas na *antecipação* de uma recompensa incerta. Se a recompensa for previsível, o interesse decai. Se for variável (como o feed do Instagram, onde não se sabe qual será o próximo post, ou as "caixas de loot" em jogos), a compulsão é mantida.51 O Robinhood utilizou a animação de "confetes" ao realizar uma transação para criar uma recompensa visual gratificante, gamificando o investimento (embora tenha atraído escrutínio regulatório por incentivar o trading compulsivo).54 Em apps utilitários, a variabilidade pode vir de conteúdos novos, desbloqueio de features ou feedbacks de progresso inesperados.

### **7.3. Investimento e Aversão à Perda (Sunk Cost)**

A fase final é o Investimento. Quanto mais tempo, dados e esforço um usuário coloca em um produto, mais difícil é abandoná-lo (Sunk Cost Fallacy). No Duolingo, a "Ofensiva" (Streak) é um ativo que o usuário constrói. Perder um dia significa perder meses de investimento visível. O usuário retorna não para ganhar algo novo, mas para *não perder* o que já construiu.49 Personalização, playlists no Spotify e histórico de dados são formas poderosas de investimento que aumentam o custo de troca (switching cost).

## ---

**8\. Estratégias de Paywall e Psicologia de Preços**

A monetização eficaz depende de como o valor é apresentado e ancorado.

### **8.1. Ancoragem e o Efeito Isca (Decoy Effect)**

Em telas de preços, a ordem e a relação entre as opções são críticas. A **Ancoragem** sugere apresentar primeiro a opção mais cara (ou um preço anual elevado) para estabelecer um valor de referência alto. Em comparação, as opções subsequentes parecem mais razoáveis.57 O **Efeito Isca** envolve adicionar uma opção que é assimétrica dominada para empurrar o usuário para a opção alvo (geralmente a mais lucrativa). Por exemplo, oferecer uma assinatura digital por $50, uma impressa por $120 e uma "combo" (digital \+ impressa) também por $120. A opção apenas impressa é a isca; ninguém a escolhe, mas ela torna o combo irresistivelmente atraente em comparação.59

### **8.2. Paywalls "Hard" vs. "Soft"**

A agressividade do paywall depende da proposta de valor.

* **Hard Paywall:** Bloqueia todo o conteúdo até o pagamento. Funciona bem para produtos que resolvem uma dor aguda imediata (ex: apps de fitness especializados ou relatórios de crédito).  
* **Soft/Dismissible Paywall:** Permite fechar a oferta e usar uma versão limitada. É ideal para modelos freemium baseados em hábito. O botão de fechar ("X") muitas vezes aparece com atraso ou é visualmente discreto para forçar a consideração da oferta antes da rejeição.60 O **Day-0 Premium Positioning** (apresentar o paywall logo no onboarding) aproveita o momento de máxima motivação do usuário para converter, mostrando altas taxas de sucesso em 2025\.60

## ---

**9\. Design Global: Adaptação Cultural e Super Apps**

A UX não é universal; é culturalmente dependente.

### **9.1. Densidade vs. Minimalismo: O Modelo WeChat**

Enquanto o design ocidental prioriza o minimalismo, o foco na tarefa única e o espaço em branco ("Less is More"), o ecossistema digital asiático (liderado pela China) favorece "Super Apps" como o WeChat. Estes apps caracterizam-se por alta densidade de informação, múltiplas funcionalidades simultâneas e navegação complexa, refletindo uma preferência cultural por ter todas as opções visíveis ("Ichimokuryouzen" \- entender num relance) e uma jornada baseada em descoberta e navegação (browsing) em vez de busca direta.61 Para apps globais, isso exige interfaces adaptáveis que possam ser "densificadas" para mercados orientais.

### **9.2. Brasil: Mobile-First e Conversacional**

No Brasil, um mercado profundamente social e mobile-first, a integração com WhatsApp e a humanização do suporte são vitais. O checkout deve ser otimizado para conexões móveis e oferecer métodos de pagamento locais proeminentes (PIX, Parcelamento). A tolerância a formulários longos é menor, e a expectativa de gratificação imediata e suporte via chat é alta.64

## ---

**10\. O Futuro: IA, Voz e Ética**

À medida que avançamos para 2026, a interface torna-se mais preditiva e menos reativa.

### **10.1. Personalização Preditiva com IA**

A IA permitirá interfaces que se adaptam em tempo real ao comportamento do usuário. Se um usuário demonstra dificuldade ou hesitação, a interface pode simplificar-se automaticamente ou oferecer ajuda. A personalização vai além do conteúdo ("Recomendado para você") para a própria estrutura da UI (reordenar menus baseados em uso frequente).12

### **10.2. A Batalha Ética: Dark Patterns**

O uso de "Dark Patterns" (padrões de design manipulativos, como dificultar o cancelamento ou adicionar itens escondidos ao carrinho) está sob crescente escrutínio regulatório e social. Embora possam aumentar métricas de curto prazo, eles geram churn tóxico e desconfiança. O **Design Ético** foca na transparência e no consentimento informado, construindo um LTV (Lifetime Value) mais saudável e sustentável. Empresas que facilitam o cancelamento ("Offboarding" suave) paradoxalmente veem mais usuários retornarem no futuro.67

## ---

**Conclusão**

A ciência da interface em 2025 é uma disciplina holística. Para dominar a conversão e a retenção, não basta desenhar telas bonitas; é necessário arquitetar experiências que respeitem a fisiologia do olho, a psicologia da emoção e a economia da atenção do cérebro humano. A interface perfeita é aquela que desaparece, deixando apenas o fluxo ininterrupto entre a intenção do usuário e a realização do seu desejo.

#### **Referências citadas**

* Color Psychology in UI Design: How Does It Influence User Decisions? | Voya Blog, acessado em janeiro 22, 2026, [https://voya.digital/en/blog/color-psychology-in-ui-design-how-does-it-influence-user-decisions/](https://voya.digital/en/blog/color-psychology-in-ui-design-how-does-it-influence-user-decisions/)  
* How Neurodesign Improves Conversion for Business | 2025 \- Seven Koncepts, acessado em janeiro 22, 2026, [https://sevenkoncepts.com/blog/neurodesign-improves-conversion-business-2025/](https://sevenkoncepts.com/blog/neurodesign-improves-conversion-business-2025/)  
* The Hidden Psychology of Successful Mobile Apps (Infographic) \- CleverTap, acessado em janeiro 22, 2026, [https://clevertap.com/blog/psychology-of-successful-mobile-apps-infographic/](https://clevertap.com/blog/psychology-of-successful-mobile-apps-infographic/)  
* Conversion Rate Optimization Best Practices for 2025 \- Reddit Ads, acessado em janeiro 22, 2026, [https://www.business.reddit.com/learning-hub/articles/conversion-rate-optimization-best-practices](https://www.business.reddit.com/learning-hub/articles/conversion-rate-optimization-best-practices)  
* 10 Conversion Rate Optimization Best Practices for 2025 \- fermàt, acessado em janeiro 22, 2026, [https://www.fermatcommerce.com/post/conversion-rate-optimization-best-practices](https://www.fermatcommerce.com/post/conversion-rate-optimization-best-practices)  
* What Is Glassmorphism? | IxDF \- The Interaction Design Foundation, acessado em janeiro 22, 2026, [https://www.interaction-design.org/literature/topics/glassmorphism](https://www.interaction-design.org/literature/topics/glassmorphism)  
* Neumorphism vs Glassmorphism 2025: UI Trends \- Redlio Designs, acessado em janeiro 22, 2026, [https://redliodesigns.com/blog/neumorphism-vs-glassmorphism-2025-ui-trends](https://redliodesigns.com/blog/neumorphism-vs-glassmorphism-2025-ui-trends)  
* Best Practices for Mobile UI/UX Design in 2025 | by Carlos Smith \- Medium, acessado em janeiro 22, 2026, [https://medium.com/@CarlosSmith24/best-practices-for-mobile-ui-ux-design-in-2025-b5e35310c4e9](https://medium.com/@CarlosSmith24/best-practices-for-mobile-ui-ux-design-in-2025-b5e35310c4e9)  
* The Psychology of Colors in UI/UX Design | by Design Sphere | Medium, acessado em janeiro 22, 2026, [https://medium.com/@design.sphere/the-psychology-of-colors-in-ui-ux-design-2b478c420a63](https://medium.com/@design.sphere/the-psychology-of-colors-in-ui-ux-design-2b478c420a63)  
* How to Use Color Psychology to Drive Engagement and Retention in UI Design, acessado em janeiro 22, 2026, [https://hackernoon.com/how-to-use-color-psychology-to-drive-engagement-and-retention-in-ui-design](https://hackernoon.com/how-to-use-color-psychology-to-drive-engagement-and-retention-in-ui-design)  
* The Psychology of Color in Digital Design: Strategies for an Impactful Experience \- Aguayo, acessado em janeiro 22, 2026, [https://aguayo.co/en/blog-aguayo-user-experience/the-psychology-of-color-in-digital-design/](https://aguayo.co/en/blog-aguayo-user-experience/the-psychology-of-color-in-digital-design/)  
* UI/UX Design Trends in Mobile Apps for 2025 | Chop Dawg, acessado em janeiro 22, 2026, [https://www.chopdawg.com/ui-ux-design-trends-in-mobile-apps-for-2025/](https://www.chopdawg.com/ui-ux-design-trends-in-mobile-apps-for-2025/)  
* Visual Hierarchy, Gutenberg Diagram, F & Z Pattern | by Ying Design \- Medium, acessado em janeiro 22, 2026, [https://yingdesign.medium.com/be-a-designer-who-can-also-help-with-writing-copy-2f4ea02a5646](https://yingdesign.medium.com/be-a-designer-who-can-also-help-with-writing-copy-2f4ea02a5646)  
* Visual Hierarchy: Organizing content to follow natural eye movement patterns | IxDF, acessado em janeiro 22, 2026, [https://www.interaction-design.org/literature/article/visual-hierarchy-organizing-content-to-follow-natural-eye-movement-patterns](https://www.interaction-design.org/literature/article/visual-hierarchy-organizing-content-to-follow-natural-eye-movement-patterns)  
* Demystifying Viewing Patterns \- Yoast, acessado em janeiro 22, 2026, [https://yoast.com/demystifying-viewing-patterns/](https://yoast.com/demystifying-viewing-patterns/)  
* How Does Eye Movement Shape Better App Layouts?, acessado em janeiro 22, 2026, [https://thisisglance.com/learning-centre/how-does-eye-movement-shape-better-app-layouts](https://thisisglance.com/learning-centre/how-does-eye-movement-shape-better-app-layouts)  
* How People Read Online \- Omnizant, acessado em janeiro 22, 2026, [https://omnizant.com/how-people-read-online/](https://omnizant.com/how-people-read-online/)  
* 3 Design Layouts: Gutenberg Diagram, Z-Pattern, And F-Pattern \- Vanseo Design, acessado em janeiro 22, 2026, [https://vanseodesign.com/web-design/3-design-layouts/](https://vanseodesign.com/web-design/3-design-layouts/)  
* The 3 Most Important Page Layouts (And When to Use Them) \- Avada, acessado em janeiro 22, 2026, [https://avada.com/blog/the-most-important-page-layouts/](https://avada.com/blog/the-most-important-page-layouts/)  
* 12 Techniques for Post-Click Landing Page Design Inspiration \- Instapage, acessado em janeiro 22, 2026, [https://instapage.com/blog/landing-page-design-inspiration](https://instapage.com/blog/landing-page-design-inspiration)  
* Gaze Cueing: A Game-Changing Marketing Tactic? | by Carlos Gabriel Ortega | Medium, acessado em janeiro 22, 2026, [https://medium.com/@IMkrloscpa/gaze-cueing-a-game-changing-marketing-tactic-8fae696c21e9](https://medium.com/@IMkrloscpa/gaze-cueing-a-game-changing-marketing-tactic-8fae696c21e9)  
* Visual Cues in Digital Marketing: How to Use Them (With Examples) \- CXL, acessado em janeiro 22, 2026, [https://cxl.com/blog/visual-cues/](https://cxl.com/blog/visual-cues/)  
* 10 Mobile App Design Best Practices for 2025 \- Nerdify Blog, acessado em janeiro 22, 2026, [https://getnerdify.com/blog/mobile-app-design-best-practices/](https://getnerdify.com/blog/mobile-app-design-best-practices/)  
* Designing For Thumb Zones: Mobile UX In 2025, acessado em janeiro 22, 2026, [https://diversewebsitedesign.com.au/designing-for-thumb-zones-mobile-ux-in-2025/](https://diversewebsitedesign.com.au/designing-for-thumb-zones-mobile-ux-in-2025/)  
* Thumb-Zone Optimization: Mobile Navigation Patterns That Reduced User Effort by 55%, acessado em janeiro 22, 2026, [https://medium.com/@webdesignerindia/thumb-zone-optimization-mobile-navigation-patterns-9fbc54418b81](https://medium.com/@webdesignerindia/thumb-zone-optimization-mobile-navigation-patterns-9fbc54418b81)  
* 76: Mobile-First Mindset: Designing for the Thumb Zone \- insidethesquare.co, acessado em janeiro 22, 2026, [https://insidethesquare.co/podcast/76](https://insidethesquare.co/podcast/76)  
* The Death of the Hamburger Menu? Navigating Mobile Design in 2025 \- CopyElement Blog, acessado em janeiro 22, 2026, [https://blog.copyelement.com/the-death-of-the-hamburger-menu-navigating-mobile-design-in-2025/](https://blog.copyelement.com/the-death-of-the-hamburger-menu-navigating-mobile-design-in-2025/)  
* What is Hamburger Menu Getting Replaced by \_\_\_\_? | by Saurabh | daiom \- Medium, acessado em janeiro 22, 2026, [https://medium.com/daiom/what-is-hamburger-menu-getting-replaced-by-e2d7e463de62](https://medium.com/daiom/what-is-hamburger-menu-getting-replaced-by-e2d7e463de62)  
* The Psychology of Payments: How Checkout Experience Impacts Purchase Decisions, acessado em janeiro 22, 2026, [https://www.pluralonline.com/the-psychology-of-payments/](https://www.pluralonline.com/the-psychology-of-payments/)  
* 7 Cognitive Biases That Impact Conversion Rates And How To Leverage Them To Your Advantage, acessado em janeiro 22, 2026, [https://conversionfanatics.com/7-cognitive-biases-that-impact-conversion-rates-and-how-to-leverage-them-to-your-advantage/](https://conversionfanatics.com/7-cognitive-biases-that-impact-conversion-rates-and-how-to-leverage-them-to-your-advantage/)  
* Zeigarnik Effect in UX Design \- GeeksforGeeks, acessado em janeiro 22, 2026, [https://www.geeksforgeeks.org/techtips/zeigarnik-effect-in-ux-design/](https://www.geeksforgeeks.org/techtips/zeigarnik-effect-in-ux-design/)  
* Zeigarnik Effect: How to Apply It in UX | Aguayo's Blog, acessado em janeiro 22, 2026, [https://aguayo.co/en/blog-aguayo-user-experience/zeigarnik-effect-how-to-apply-it-in-ux/](https://aguayo.co/en/blog-aguayo-user-experience/zeigarnik-effect-how-to-apply-it-in-ux/)  
* Endowed Progress: Jumpstart user motivation \- Learning Loop, acessado em janeiro 22, 2026, [https://learningloop.io/plays/psychology/endowed-progress-effect](https://learningloop.io/plays/psychology/endowed-progress-effect)  
* Design perfect UX tasks: the Endowed Progress Effect | by David Teodorescu \- Medium, acessado em janeiro 22, 2026, [https://medium.com/usabilitygeek/design-perfect-ux-tasks-the-endowed-progress-effect-7461ca20076c](https://medium.com/usabilitygeek/design-perfect-ux-tasks-the-endowed-progress-effect-7461ca20076c)  
* Endowed progress effect: Give your users a head start | by Canvs Editorial \- UX Collective, acessado em janeiro 22, 2026, [https://uxdesign.cc/endowed-progress-effect-give-your-users-a-head-start-97d52d8b0396](https://uxdesign.cc/endowed-progress-effect-give-your-users-a-head-start-97d52d8b0396)  
* 2025 UI Trends That Actually Improve Conversion Rates (With Examples) | by AlterSquare, acessado em janeiro 22, 2026, [https://altersquare.medium.com/2025-ui-trends-that-actually-improve-conversion-rates-with-examples-b00795b4b56d](https://altersquare.medium.com/2025-ui-trends-that-actually-improve-conversion-rates-with-examples-b00795b4b56d)  
* 10 Actionable Conversion Rate Optimization Best Practices for 2025, acessado em janeiro 22, 2026, [https://group107.com/blog/conversion-rate-optimization-best-practices/](https://group107.com/blog/conversion-rate-optimization-best-practices/)  
* 10 Mobile Checkout UX Tips for 2025 \- DeveloperUX, acessado em janeiro 22, 2026, [https://developerux.com/2025/07/30/10-mobile-checkout-ux-tips-for-2025/](https://developerux.com/2025/07/30/10-mobile-checkout-ux-tips-for-2025/)  
* Checkout UX Best Practices 2025 – Baymard Institute, acessado em janeiro 22, 2026, [https://baymard.com/blog/current-state-of-checkout-ux](https://baymard.com/blog/current-state-of-checkout-ux)  
* The UX of form validation: Inline or after submission? \- LogRocket Blog, acessado em janeiro 22, 2026, [https://blog.logrocket.com/ux-design/ux-form-validation-inline-after-submission/](https://blog.logrocket.com/ux-design/ux-form-validation-inline-after-submission/)  
* How to Design UI Forms in 2025: Your Best Guide | IxDF, acessado em janeiro 22, 2026, [https://www.interaction-design.org/literature/article/ui-form-design](https://www.interaction-design.org/literature/article/ui-form-design)  
* Usability Testing of Inline Form Validation \- Baymard, acessado em janeiro 22, 2026, [https://baymard.com/blog/inline-form-validation](https://baymard.com/blog/inline-form-validation)  
* Floating vs. Static Labels: Which are More Accessible? \- UserWay, acessado em janeiro 22, 2026, [https://userway.org/blog/floating-vs-static-labels/](https://userway.org/blog/floating-vs-static-labels/)  
* "Floating labels" vs "Fixed small labels" on the the web? \- User Experience Stack Exchange, acessado em janeiro 22, 2026, [https://ux.stackexchange.com/questions/82960/floating-labels-vs-fixed-small-labels-on-the-the-web](https://ux.stackexchange.com/questions/82960/floating-labels-vs-fixed-small-labels-on-the-the-web)  
* Are Float Labels Really That Problematic After All? | by MDS | bymds \- Medium, acessado em janeiro 22, 2026, [https://medium.com/bymds/are-float-labels-really-that-problematic-after-all-da7ffe7d5417](https://medium.com/bymds/are-float-labels-really-that-problematic-after-all-da7ffe7d5417)  
* Microcopy in UX Design: Tips and Examples for Better User Experience \- Innerview, acessado em janeiro 22, 2026, [https://innerview.co/blog/microcopy-in-ux-small-text-big-impact-on-user-experience](https://innerview.co/blog/microcopy-in-ux-small-text-big-impact-on-user-experience)  
* Microcopy Importance in UX: Examples & Tips for UX Writing \- Design Studio UI/UX, acessado em janeiro 22, 2026, [https://www.designstudiouiux.com/blog/what-is-microcopy-ux/](https://www.designstudiouiux.com/blog/what-is-microcopy-ux/)  
* What is Microcopy and 8 Examples to Tell You Why You Need It \- UserGuiding, acessado em janeiro 22, 2026, [https://userguiding.com/blog/microcopy](https://userguiding.com/blog/microcopy)  
* How Duolingo Gamified Monthly Active Users: Lessons in Habit Formation \- PM Repo, acessado em janeiro 22, 2026, [https://www.thepmrepo.com/articles/how-duolingo-gamified-monthly-active-users-lessons-in-habit-formation](https://www.thepmrepo.com/articles/how-duolingo-gamified-monthly-active-users-lessons-in-habit-formation)  
* Habit-Forming Design: Gamify. Motivate. Retain. — Learn How Duolingo Keeps Their Users Hooked \- Jennifer Handali, acessado em janeiro 22, 2026, [https://jenniferhandali.medium.com/habit-forming-design-gamify-motivate-retain-learn-how-duolingo-keeps-their-users-hooked-6812c85a0a42](https://jenniferhandali.medium.com/habit-forming-design-gamify-motivate-retain-learn-how-duolingo-keeps-their-users-hooked-6812c85a0a42)  
* The Emotional Reinforcement Mechanism of and Phased Intervention Strategies for Social Media Addiction \- PMC \- PubMed Central, acessado em janeiro 22, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12108933/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12108933/)  
* How to Use Variable Rewards to Hook Users and Drive Product Adoption \- Userpilot, acessado em janeiro 22, 2026, [https://userpilot.com/blog/variable-rewards/](https://userpilot.com/blog/variable-rewards/)  
* Supercharging new users' desire with variable rewards \- Appcues, acessado em janeiro 22, 2026, [https://www.appcues.com/blog/variable-rewards](https://www.appcues.com/blog/variable-rewards)  
* Gamification in Stock Trading: Lessons from Robinhood \- EngineerBabu, acessado em janeiro 22, 2026, [https://engineerbabu.com/blog/gamification-in-stock-trading/](https://engineerbabu.com/blog/gamification-in-stock-trading/)  
* On “Confetti Regulation”: The Wrong Way to Regulate Gamified Investing | Yale Law Journal, acessado em janeiro 22, 2026, [https://yalelawjournal.org/essay/on-confetti-regulation-the-wrong-way-to-regulate-gamified-investing](https://yalelawjournal.org/essay/on-confetti-regulation-the-wrong-way-to-regulate-gamified-investing)  
* The Sunk Cost Fallacy \- The Decision Lab, acessado em janeiro 22, 2026, [https://thedecisionlab.com/biases/the-sunk-cost-fallacy](https://thedecisionlab.com/biases/the-sunk-cost-fallacy)  
* 18 Cognitive Biases You Can Use for Conversion Optimization \- CXL, acessado em janeiro 22, 2026, [https://cxl.com/blog/cognitive-biases-in-cro/](https://cxl.com/blog/cognitive-biases-in-cro/)  
* SaaS Pricing Pages 2025: UX Lessons for Higher Conversions \- Redlio Designs, acessado em janeiro 22, 2026, [https://redliodesigns.com/blog/saas-pricing-pages-2025-ux-lessons-for-higher-conversions](https://redliodesigns.com/blog/saas-pricing-pages-2025-ux-lessons-for-higher-conversions)  
* 100+ Ways to Increase Your SaaS Conversion Rate in 2025 \- Convertize, acessado em janeiro 22, 2026, [https://www.convertize.com/saas-conversion-rate/](https://www.convertize.com/saas-conversion-rate/)  
* How to Design a High-Converting Paywall \- DEV Community, acessado em janeiro 22, 2026, [https://dev.to/paywallpro/how-to-design-a-high-converting-paywall-pla](https://dev.to/paywallpro/how-to-design-a-high-converting-paywall-pla)  
* Chinese app design: Why Complexity Wins in the Chinese Digital Landscape | by Madura Herath | Medium, acessado em janeiro 22, 2026, [https://medium.com/@blogmadura/chinese-app-design-why-complexity-wins-in-the-chinese-digital-landscape-4699ea3527fb](https://medium.com/@blogmadura/chinese-app-design-why-complexity-wins-in-the-chinese-digital-landscape-4699ea3527fb)  
* UX Design in China. To the latter part of 2021 we worked on… | by Cris | UX Planet, acessado em janeiro 22, 2026, [https://uxplanet.org/ux-design-in-china-f13acb8f5f69](https://uxplanet.org/ux-design-in-china-f13acb8f5f69)  
* The Evolution of Japanese UX Design: A Shift Towards Western Minimalism \- Medium, acessado em janeiro 22, 2026, [https://medium.com/design-bootcamp/the-evolution-of-japanese-ux-design-a-shift-towards-western-minimalism-9feb75de9da8](https://medium.com/design-bootcamp/the-evolution-of-japanese-ux-design-a-shift-towards-western-minimalism-9feb75de9da8)  
* Digital 2025: Brazil — DataReportal – Global Digital Insights, acessado em janeiro 22, 2026, [https://datareportal.com/reports/digital-2025-brazil](https://datareportal.com/reports/digital-2025-brazil)  
* The Digital Pulse of Latin America: Brazil's Rise as a Global Tech Innovator, acessado em janeiro 22, 2026, [https://blog.equinix.com/blog/2025/05/07/the-digital-pulse-of-latin-america-brazils-rise-as-a-global-tech-innovator/](https://blog.equinix.com/blog/2025/05/07/the-digital-pulse-of-latin-america-brazils-rise-as-a-global-tech-innovator/)  
* Mobile Market in Brazil — Key Insights from DataReportal 2025 \- BYYD, acessado em janeiro 22, 2026, [https://www.byyd.me/en/blog/2025/07/mobile-market-in-brazil-key-insights-from-datareportal-2025/](https://www.byyd.me/en/blog/2025/07/mobile-market-in-brazil-key-insights-from-datareportal-2025/)  
* What are Dark Patterns? Examples of Deceptive Design in UX \- Scalable Path, acessado em janeiro 22, 2026, [https://www.scalablepath.com/ui-ux-design/dark-pattern-examples](https://www.scalablepath.com/ui-ux-design/dark-pattern-examples)  
* Design Ethics Vs Dark Side UX. Design itself is a persuasive… | by Moses Kim | UX Planet, acessado em janeiro 22, 2026, [https://uxplanet.org/design-ethics-vs-dark-side-ux-15a703870ec6](https://uxplanet.org/design-ethics-vs-dark-side-ux-15a703870ec6)  
* Dark Patterns vs Ethical UX: Where Do Designers Draw the Line? \- Medium, acessado em janeiro 22, 2026, [https://medium.com/@marketingtd64/dark-patterns-vs-ethical-ux-where-do-designers-draw-the-line-d5306387bf30](https://medium.com/@marketingtd64/dark-patterns-vs-ethical-ux-where-do-designers-draw-the-line-d5306387bf30)

# **THE ARCHITECTURAL SHIFT: FROM DOCUMENT OBJECT MODELS TO EXPERIENTIAL SPATIAL ENVIRONMENTS**

## **Executive Summary: The Definition of a "Place" on the Web**

The internet, since its inception, has been inextricably bound to the metaphor of the "page"—a digital remediation of the printed document. We scroll through columns of text, click static hyperlinks, and navigate hierarchies that mimic a library archive or a filing cabinet. This skepticism of the third dimension was born of necessity; bandwidth was scarce, and processing power was limited. However, we have crossed a threshold. The era of the "page" is ending. We are entering the era of the "place."

A "place" on the web is not a document to be read; it is a volumetric, spatially continuous environment to be inhabited. It replaces the passive consumption of information with active exploration. In this paradigm, the user is not an observer staring at a screen, but an actor with agency, mass, and presence within a digital reality. The goal is no longer merely to convey information, but to induce a state of *presence*—the psychological sensation of "being there."

This report serves as an exhaustive technical and creative blueprint for architecting these immersive 3D web experiences. It is designed for the technical artist and creative director who demands not just visual novelty, but a fundamental restructuring of how users interact with digital content. The standard set by pioneers like Bruno Simon is not merely aesthetic; it is interactional. It replaces the mouse cursor with a character controller, the scrollbar with locomotion, and the DOM overlay with diegetic interfaces.

To achieve a website that feels like a "living, breathing world," we must abandon the safe constraints of the traditional DOM and embrace the raw potential of the scene graph. We must leverage the computational power of the GPU through WebGL and the emerging WebGPU standard to simulate physics, light, and organic motion in real-time. This document explores the specific design methodologies, mathematical principles, and engineering stacks required to build a "place" that rivals high-end video game introductions, rendered natively in the browser.

## ---

**PART I: SPATIAL UX & NAVIGATION (BREAKING THE 2D PLANE)**

The transition from 2D web design to 3D spatial computing requires a complete reimagining of user agency. In a traditional website, the user’s agency is strictly limited: they can scroll vertically, and they can click discrete targets. The mental model is one of moving a viewport down a long sheet of paper. In a spatial web experience, agency is exploded into three dimensions. It is defined by *locomotion*, *orientation*, and *manipulation*. The user must feel physically transported, subject to the laws of a simulated reality. This section outlines the mechanics of spatial navigation that transcend the scrollbar.

### **1.1 The Mechanics of Locomotion: Beyond the Scroll**

The scrollbar is the primary artifact of the document metaphor. It implies linearity—a beginning, a middle, and an end. A "place" is non-linear. Movement should mimic physical traversal, vehicle operation, or cinematic direction. The implementation of locomotion determines the "weight" of the user's presence.

#### **1.1.1 First-Person "Fly-Throughs" and The Camera as Protagonist**

The most direct method to achieve immersion is to align the digital viewport with the user’s visual cortex. First-person navigation (FPS) creates an immediate sense of scale and intimacy. However, raw FPS controls (WASD \+ Mouse Look) often present high friction for non-gaming users and can lead to motion sickness if not handled with sophisticated damping.

* **Cinematic Damping and Inertia:** To avoid the nausea-inducing "twitchiness" of raw mouse input, we must implement critical damping springs. The camera should never snap instantly to the cursor’s position; instead, it should *flow* towards the target orientation. Using libraries like maath or custom Verlet integration, we apply rotational inertia. When the user looks left, the camera accelerates, coasts, and settles, mimicking the physical weight of a human head or a heavy steadicam rig.1 This introduces a split-second latency between intent and result, which paradoxically makes the control feel more "real" because physical objects do not have infinite acceleration.  
* **Scroll-Jacked Cinematic Paths:** For narrative-heavy experiences where specific information must be conveyed in a sequence, "on-rails" movement triggered by scroll intent is a powerful hybrid. Here, the user’s scroll wheel does not translate the camera along the Y-axis. Instead, it advances a timeline (e.g., Theater.js or GSAP timeline). The camera follows a Catmull-Rom spline through the 3D scene. This allows the director to frame specific compositions—establishing shots, close-ups, wide pans—while giving the user control over the *pacing* of the journey. The user feels they are "driving" the experience, even though the path is predetermined. This technique transforms the website into an interactive film.  
* **Look-At Constraints and Focus:** As the camera moves along the spline, dynamic "look-at" targets should guide the user’s attention. Using quaternion interpolation (Quaternion.slerp), the camera smoothly transitions its focus from a distant mountain to a foreground product, ensuring the narrative beats are hit without disorienting the viewer.3 This mimics the autofocus and attention of a human observer.

#### **1.1.2 Third-Person Avatar Controllers (The "Bruno Simon" Effect)**

The inclusion of a visible avatar—whether a realistic car, a stylized bird, a robot, or an abstract sphere—fundamentally changes the psychological relationship between the user and the site. The user is no longer a floating ghost; they are *embodied*.

* **Physics-Based Controllers:** The avatar must not merely translate coordinates; it must respect physics. A raycast suspension system for a vehicle or a kinematic character controller for a humanoid adds friction, inertia, and collision response. When the avatar hits a wall, it should bounce or slide, not clip through. This feedback loop confirms the solidity of the world.4 The complexity of the physics simulation (using engines like Rapier or Cannon.js) directly correlates to the sense of immersion. A car that drifts when turning at high speed communicates "speed" and "danger" far better than a simple animation.  
* **Camera Follow Logic:** The camera must trail the avatar with a "lazy" elasticity. A hard-parented camera feels rigid and artificial. Implementing a spring-damper system where the camera pursues the avatar's position with a slight delay accentuates speed and acceleration. When the avatar boosts forward, the camera should lag slightly, widening the field of view to simulate the "warp speed" effect.  
* **Spatial Context:** The third-person view allows the user to see the environment's reaction to their presence—grass parting, dust kicking up, or lights flickering as they pass. This environmental reactivity reinforces the user's agency.

#### **1.1.3 Orbital and Exploratory Controls**

For object-centric experiences (e.g., product showcases), the user "orbits" the subject. However, standard orbit controls are insufficient for a "place."

* **Restricted Spherical Coordinates:** We must clamp the azimuthal and polar angles to prevent the user from seeing "under the hood" or breaking the illusion of the scene. The camera should feel like it is on a physical rail or gimbal.  
* **Inertial Spin:** When the user releases a drag gesture, the scene should continue to rotate and slowly friction-stop. This "throwability" imparts mass to the object.6 The friction coefficient becomes a design variable—high friction feels heavy and industrial; low friction feels slick and aerodynamic.

| Control Scheme | Best For | Technical Key | "Feel" Factor |
| :---- | :---- | :---- | :---- |
| **Cinematic Scroll** | Storytelling, Linear Narrative | Spline interpolation, Theater.js | User controls *time*, not space. |
| **First-Person** | Architectural Vis, Galleries | Damped mouse look, Collision | Intimate, immersive, grounded. |
| **Third-Person** | Gamified Portfolios, Exploration | RigidBody Physics, Rapier.js | Playful, embodied, tactile. |
| **Orbital** | Product Configurator | Polar angle clamping, Inertia | Precision, object-focus. |

### **1.2 Diegetic User Interfaces (UI): Erasing the Overlay**

The quickest way to break immersion is to plaster a flat, 2D HTML/CSS menu over a beautifully rendered 3D world. It reminds the user they are looking at a screen. Diegetic UI embeds the interface *into* the fiction of the world, treating text and buttons as physical objects.

#### **1.2.1 Spatial Typography and Holography**

Text should exist as geometry within the scene, subject to the same lighting and post-processing as the environment.

* **SDF (Signed Distance Field) Rendering:** Traditional texture-based text pixelates when the camera gets close. To maintain immersion at any distance, we must use Signed Distance Fields. SDFs store the distance from a pixel to the edge of the glyph, allowing the shader to reconstruct a crisp edge at any magnification. Using libraries like troika-three-text, we render text that can be lit, cast shadows, and even refracted through glass.7  
* **Floating Holograms:** Menus can be presented as floating panes of glass or energy fields that orient themselves towards the camera (billboarding) but retain perspective distortion. These elements should react to cursor proximity—glowing brighter or shifting parallax layers when hovered. The UI becomes a light source in the scene.  
* **Physics-Enabled Buttons:** A "button" in a 3D world should be a physical object. When clicked, it should depress along its local Z-axis, perhaps triggering a mechanical sound and a burst of particles. It should feel *squishy* or *clicky*, utilizing spring physics to return to its original position.10 The feedback is not just a color change; it is a kinetic event.

#### **1.2.2 World-Integrated Navigation**

Instead of a navbar with "About," "Work," and "Contact," use spatial landmarks.

* **Signage and Wayfinding:** Project text onto walls using decals or hang neon signs in the virtual space. To navigate to the "Contact" section, the user drives their avatar to the building labeled "Communications Array." This turns navigation into exploration.  
* **Object-Based Interaction:** Content is revealed by interacting with objects. Opening a drawer reveals a portfolio piece; tuning a virtual radio changes the audio track; looking through a telescope triggers a zoom transition to a new scene. This encourages the user to "touch" the world.  
* **Contextual Pop-ups:** Information should appear near the object of interest. If the user hovers over a product, a 3D label line should draw itself out from the geometry, anchoring the data to the specific vertex.12

### **1.3 Seamless Transitions: The Art of Continuity**

Loading screens are the "cuts" in a film; in a persistent world, we want a "one-shot" take. Transitions must be disguised or integrated into the movement mechanics to maintain the flow state.

#### **1.3.1 Portal Rendering and Stencil Buffers**

Portals allow users to see into and step through to other dimensions or scenes without breaking stride. This is the "Rick and Morty" effect.

* **Render Targets:** To create a portal, we render a secondary camera’s view of the destination scene into an off-screen texture (Frame Buffer Object). This texture is then mapped onto the portal geometry in the main scene.  
* **Oblique Near-Plane Clipping:** To allow the user to walk *through* the portal without the geometry clipping awkwardly, we modify the projection matrix of the portal camera to clip everything between the portal plane and the camera. This creates a perfect seamless illusion.13  
* **Recursive Rendering:** For "hall of mirrors" effects or nested worlds, we can render portals inside portals, though this requires careful management of recursion depth to preserve performance.

#### **1.3.2 Non-Euclidean Geometry and Wormholes**

We can bend space to connect disparate scenes, defying standard topology.

* **Vertex Shader Morphing:** As the user travels through a "tunnel" or "wormhole," we can stream in the geometry of the next scene. Using vertex shaders, we can bend the tunnel into a spiral or stretch the user's view (fov-kick) to simulate hyperspeed, masking the asset loading of the next area.  
* **Infinite Zoom:** The "Powers of Ten" effect. The user zooms into an object (e.g., a screen on a desk), and as the camera passes through the screen surface, the screen becomes the entire world. This is achieved by smoothly interpolating the camera's field of view and position while swapping the background scene for the detailed foreground object. The scale factor must be handled carefully to avoid floating-point precision errors (Z-fighting).16

#### **1.3.3 Procedural Scene Stitching**

Instead of loading distinct "levels," use procedural generation to bridge areas. If the user moves from the "Forest" portfolio to the "Urban" contact page, a procedural algorithm can slowly morph the trees into lampposts and the grass into pavement, creating a fluid metamorphosis rather than a hard cut.19

## ---

**PART II: ORGANIC 3D ANIMATION & PHYSICS (MAKING IT FEEL "REAL")**

A static 3D world feels like a museum. A "place" feels alive. It reacts. It has entropy. It has chaos. To achieve this, we must move beyond pre-baked animations and embrace real-time simulation. The world must possess mass, elasticity, and fluid dynamics.

### **2.1 The Physics of UI: Soft Body and Cloth Simulation**

Standard web UI is rigid. Boxes are rectangles of hard pixels. In an immersive world, UI should feel organic. It should yield to the touch.

#### **2.1.1 Soft Body Dynamics (Jelly UI)**

Imagine a "Contact" button that isn't a hard rectangle, but a gelatinous blob suspended in zero gravity. When poked, it jiggles.

* **Spring-Mass Systems:** We can simulate soft bodies by connecting a grid of vertices with invisible springs. When the cursor strikes the object, the impact force propagates through the mesh, causing it to ripple and deform. This is achievable using physics engines like Rapier.js (which uses WASM for near-native performance) or Cannon.es.11  
* **Vertex Shader Displacement:** For lighter-weight "squishiness," we can use a vertex shader. By calculating the distance from the cursor to each vertex, we can apply a radial displacement force in the shader, making the object appear to bulge away from or attract towards the mouse. This runs entirely on the GPU and is incredibly fast, suitable for thousands of UI elements simultaneously.10

#### **2.1.2 Cloth and Drapery**

Cloth simulation adds a layer of tactile realism. Banners, curtains, or clothing on a character should react to wind and movement.

* **Verlet Integration:** A constraint-based Verlet integration solver can simulate cloth in real-time. Each vertex of the cloth geometry is a particle constrained to its neighbors. As the user drags the mouse, they generate "wind" vectors that billow the fabric.  
* **WebGPU Compute for Cloth:** For high-fidelity cloth (thousands of constraints), we move the solver to a WebGPU compute shader. This allows for self-collision and intricate folding that would choke the main thread.22

### **2.2 Advanced Particle Systems: The Power of Compute Shaders**

Particles are the "magic dust" of immersive web experiences. They visualize invisible forces—data streams, wind, sound, or magic.

#### **2.2.1 The WebGPU Revolution**

Traditional WebGL particle systems are limited by CPU-to-GPU bandwidth. The CPU must calculate position updates and upload them each frame. WebGPU eliminates this bottleneck using Compute Shaders, unlocking millions of simulated particles.

* **GPU-Side Simulation:** With WebGPU, we define a "storage buffer" containing the state (position, velocity, mass) of millions of particles. A compute shader runs purely on the GPU to update these states based on physics rules (gravity, curl noise, attraction). The render pipeline then simply draws the buffer. This enables 1M+ particles at 60fps, creating dense, volumetric clouds of data.24  
* **Boids and Flocking:** We can simulate complex organic behaviors like bird flocks or fish schools (boids). Each particle calculates its vector based on separation, alignment, and cohesion with its neighbors. This creates "living" swarms that can form UI elements (e.g., particles swarming to form the word "WELCOME") and then disperse when disturbed by the cursor.25  
* **FBO (Frame Buffer Object) Ping-Ponging:** For legacy WebGL2 support, we use "ping-pong" rendering. We encode particle positions into the RGBA channels of a floating-point texture. A shader reads the "current" texture, calculates the new positions, and writes to a "next" texture. This texture is then used to displace vertices in the vertex shader.27

#### **2.2.2 Interactive Force Fields**

Particles must not just move; they must react to the user.

* **Cursor Attractors/Repulsors:** The cursor position is passed as a uniform to the compute shader. Particles within a certain radius receive a force vector either towards (magnetic) or away from (shield) the cursor.  
* **Image/Model Morphing:** Particles can be assigned "target" positions based on the vertices of a 3D mesh or the pixels of an image. By interpolating between their current simulation state and their target state, particles can fluidly morph from a chaotic cloud into a 3D product model.28

### **2.3 Procedural Generation: Infinite Diversity**

To make the world feel vast and "living," we cannot rely on static assets alone. Procedural generation creates infinite variation, ensuring no two visits are identical.

#### **2.3.1 Fractal Landscapes and SDFs**

Using Signed Distance Functions (SDFs) and raymarching, we can generate infinite, mathematically defined landscapes—fractal mountains, sponge-like coral reefs, or alien architecture—without a single polygon.

* **Raymarching:** Instead of rasterizing triangles, we shoot a ray for every pixel and march it forward until it hits a mathematical surface defined by a function (e.g., length(position) \- radius). This allows for boolean operations (smooth subtraction, union) that create organic, melting shapes impossible with standard geometry. This is akin to sculpting with math.29  
* **Noise Functions:** Perlin, Simplex, and Curl noise are the DNA of procedural worlds. We use them to perturb vertex positions, generate terrain heightmaps, or drive the color gradients of the sky. By offsetting the noise lookup with time, the world seems to breathe and shift.31

#### **2.3.2 L-Systems and Organic Growth**

For vegetation or data structures, Lindenmayer Systems (L-Systems) can geometrically grow trees or branching pathways in real-time. As the user explores, the world literally grows up around them, triggered by their proximity.

## ---

**PART III: IMMERSIVE ATMOSPHERE & RENDERING (THE "LOOK")**

The difference between a "game prototype" and a "cinematic experience" is lighting and atmosphere. A sphere on a grey background is data; a sphere in volumetric fog with global illumination is a *presence*. We must emulate the behavior of photons to ground the user in reality.

### **3.1 Global Illumination (GI): Grounding the World**

Standard lighting (Ambient \+ Directional) often leaves objects looking "floaty." Global Illumination simulates how light bounces between surfaces, creating "color bleeding" and realistic occlusion.

#### **3.1.1 Screen Space Global Illumination (SSGI)**

Real-time raytracing (RTX) is not yet fully viable for the general web. SSGI is the high-fidelity bridge.

* **The Technique:** SSGI analyzes the depth and normal buffers of the rendered frame. For each pixel, it raymarches in screen space to find occlusions and reflected colors from neighboring pixels. If a red wall is next to a white floor, SSGI calculates the red bounce light hitting the floor.33  
* **Pros/Cons:** It is expensive but produces incredibly grounded visuals. It adds contact shadows and diffuse interreflection that "glues" objects to the floor. However, it can only reflect what is currently on screen (screen space limitation).35

#### **3.1.2 SDF Global Illumination (SDFGI)**

For a more robust solution that handles off-screen light bounces, we can use a sparse voxel grid or a field of Signed Distance Functions to approximate the scene geometry. This allows for off-screen bounces and real-time GI without the heavy cost of hardware raytracing. It is similar to the "Lumen" tech in Unreal Engine 5 but scaled down for WebGL.36

| Lighting Tech | Realism | Performance Cost | Best Use Case |
| :---- | :---- | :---- | :---- |
| **Baked Lightmaps** | High | Low (High VRAM) | Static scenes, Architectural Viz. |
| **SSGI** | Very High | Very High | High-end portfolios, Cinematic shots. |
| **SDFGI** | High | High | Dynamic scenes with moving lights. |
| **Hemisphere Light** | Low | Low | Stylized, Low-poly worlds. |

### **3.2 Volumetric Effects: The Air Between Things**

Vacuum is boring. Atmosphere adds depth, scale, and mood. It gives the eye cues about distance.

#### **3.2.1 Volumetric Fog and Light Shafts (God Rays)**

We simulate the scattering of light through particulate matter in the air.

* **Raymarching Volumes:** We render a proxy geometry (like a cube) that contains the volume. Inside the shader, we raymarch through the volume, accumulating density based on 3D noise textures. We also sample the shadow map at each step to see if that point in space is lit by the sun. If it is, we add light; if not, it's shadow. This creates "God Rays" slicing through the fog.37  
* **Mie and Rayleigh Scattering:** Implementing physical scattering models allows us to simulate realistic sunsets (orange/red scattering) or underwater murkiness (blue/green absorption).39

### **3.3 Post-Processing Overkill: The Cinematic Lens**

Finally, we treat the browser canvas as a camera sensor, applying optical imperfections that signal "cinema" to the brain.

* **Depth of Field (DoF):** Real cameras cannot focus on everything at once. We use a bokeh shader that blurs the scene based on the depth buffer. Crucially, the focus distance should be dynamic—raycast from the center of the screen to find what the user is looking at, and autofocus to that depth. This directs the user's eye.40  
* **Chromatic Aberration:** Separating the RGB channels at the edges of the screen simulates lens dispersion. This subtle effect adds a sense of "glass" between the user and the digital world.41  
* **Film Grain:** A subtle layer of high-frequency noise prevents color banding (dithering) and gives the render a tactile, analog texture, reducing the sterile "CG look".32  
* **Bloom:** High dynamic range (HDR) lighting requires bloom. Bright light sources should bleed into surrounding pixels. Using an "Unreal-style" bloom (multiple Gaussian blurs combined) creates a soft, dreamy light falloff.40

## ---

**PART IV: AUDIO-SPATIAL INTEGRATION (THE SONIC LANDSCAPE)**

Visuals account for only half of the immersion. In a "place," sound gives spatial cues about what is happening outside the field of view. It creates a 360-degree envelope of reality.

### **4.1 3D Positional Audio**

The WebAudio API allows us to place sound sources in 3D space, mirroring the visual scene graph.

* **PannerNode and HRTF:** We attach a PannerNode to every 3D object that emits sound. We set the panning model to HRTF (Head-Related Transfer Function), which simulates how human ears perceive directionality (binaural audio). As the user rotates the camera, the sound pans around their head. As they move closer, it gets louder (distance model). This allows the user to locate objects by sound alone.43  
* **Occlusion:** If a wall is between the user and the sound source, we must muffle the sound. This is done by casting a ray from the camera to the sound source. If the ray hits geometry, we apply a low-pass filter (BiquadFilterNode) to simulate the sound being muffled by the obstacle.45

### **4.2 Procedural Audio Synthesis**

Pre-recorded samples are repetitive. A "real" world has infinite sonic variety.

* **Physics-Driven Sound:** When a physics object collides, we don't just play a "thud.mp3." We synthesize the sound based on the impact velocity and the material properties. A hard impact creates a sharper transient; a sliding motion modulates the frequency of a noise oscillator to create a "scraping" sound. This connects the audio directly to the physics engine.45  
* **Granular Synthesis:** For ambient wind or water, we use granular synthesis—chopping small grains of audio and recombining them randomly. This creates a texture that never loops and never repeats, preventing listener fatigue.47

## ---

**PART V: TECHNICAL IMPLEMENTATION & STACK STRATEGY**

To build this, the technology stack must be robust, performant, and declarative. The days of imperative vanilla JS for complex 3D scenes are over; we need component-based architectures.

### **5.1 The Stack: React Three Fiber (R3F)**

* **Core:** React Three Fiber (R3F) is the undisputed standard. It allows us to manage the complex state of a 3D world (game logic, UI state, network streams) using the React ecosystem, while rendering with the performance of Three.js. It treats the scene graph as a declarative component tree.  
* **Physics:** react-three-rapier for rigid body physics. It runs on a separate web worker using WASM, ensuring physics calculations don't block the main thread rendering.20  
* **Abstraction:** Drei for camera controls (CameraControls, PivotControls) and loaders.  
* **Post-Processing:** @react-three/postprocessing for efficient, merged effect passes.40  
* **Sequencing:** Theater.js for cinematic camera moves and intricate animation sequencing that requires a GUI timeline.

### **5.2 Performance Optimization**

* **Instancing:** Never render 1,000 separate trees. Render one tree geometry instanced 1,000 times (InstancedMesh).  
* **Texture Compression:** Use KTX2 / Basis Universal textures. They remain compressed in GPU memory, drastically reducing VRAM usage.  
* **Draco Compression:** Compress geometry to reduce network payload.  
* **Quality Tiers:** Detect the user’s GPU (using gl.capabilities) and dynamically adjust the quality (disable SSGI, reduce particle count) for low-end devices.

**5.3 Tudo isso vale para webapps e websites?**

Sim, absolutamente. No entanto, a aplicação dessas técnicas (WebGL, WebGPU, Física, UI Espacial) difere fundamentalmente dependendo se o seu objetivo é construir um **Website de Marketing** (focado em emoção e narrativa) ou um **Webapp Funcional** (focado em utilidade e produtividade).

A resposta curta é: **A tecnologia é a mesma, mas a UX muda drasticamente.**

Aqui está a análise técnica de como adaptar esses conceitos para cada contexto:

### **1\. Webapps (SaaS, Dashboards, Ferramentas)**

Para aplicações funcionais, a "imersão total" (onde o usuário controla um personagem ou navega voando) pode ser desastrosa para a usabilidade diária. Ninguém quer ter que "pilotar um carro" apenas para clicar no botão de "Logout" ou exportar um PDF.

Neste cenário, a aplicação deve ser **Híbrida**:

* **A "Ilha" 3D:** O núcleo do aplicativo (o "canvas") é imersivo e 3D, mas os controles periféricos permanecem no DOM (HTML/CSS) tradicional para garantir acessibilidade e eficiência.  
  * *Exemplo:* Um configurador de carros (e-commerce) ou uma ferramenta de visualização de dados. O objeto 3D usa PBR (Physically Based Rendering) e sombras realistas , mas o menu de "Checkout" é uma interface React padrão sobreposta.  
* **Micro-Interações Físicas:** Em vez de transformar todo o site num jogo, use a física (Rapier.js) apenas para dar "peso" a elementos de UI. Por exemplo, cards de um Kanban que balançam suavemente ao serem arrastados (efeito de inércia) ou gráficos que reagem fluidamente ao cursor. Isso aumenta a percepção de qualidade sem atrapalhar a tarefa.  
* **Visualização de Dados em GPU:** Para apps que lidam com muitos dados (Logística, Fintech), o uso de *Compute Shaders* (WebGPU) permite renderizar centenas de milhares de pontos de dados interativos em tempo real, algo impossível com a DOM tradicional.

### **2\. Websites (Portfólios, Landing Pages, Storytelling)**

Aqui, a liberdade é total. O objetivo é reter a atenção e criar memória, não necessariamente agilizar uma tarefa.

* **Narrativa Espacial (Scrollytelling 3D):** Onde o scroll do usuário não move a página para baixo, mas avança uma câmera por um caminho pré-definido (spline) dentro de um mundo 3D. Isso é ideal para explicar produtos complexos ou contar a história da marca.  
* **Transições "Sem Costura" (Seamless):** Em sites de luxo ou moda, usar transições de distorção de textura ou portais entre páginas mantém o usuário em estado de fluxo, mascarando o carregamento de conteúdo.

### **3\. O Futuro: Webapps Espaciais (Spatial Computing)**

Com a chegada de dispositivos como o Apple Vision Pro, a linha entre "Webapp" e "Mundo 3D" está desaparecendo. Interfaces que hoje são "flat" (2D) estão sendo redesenhadas como objetos flutuantes no espaço.

* **UI Diegética em Apps Reais:** Imagine um app de arquitetura onde as medidas não estão numa tabela lateral, mas flutuando diretamente sobre as paredes do modelo 3D.  
* **Áudio Espacial:** Em um webapp de videoconferência (tipo Google Meet), usar áudio posicional (HRTF) permite que você ouça a voz da pessoa vindo da direção onde o vídeo dela está na tela, reduzindo a fadiga cognitiva.

### **Resumo das Restrições Técnicas**

Ao aplicar isso em Webapps de produção, considere:

1. **Acessibilidade (a11y):** Interfaces puramente 3D/Canvas são "invisíveis" para leitores de tela. Para webapps sérios, você **deve** manter uma árvore DOM paralela ou usar bibliotecas como @react-three/a11y para garantir que o foco do teclado e leitores funcionem.  
2. **Consumo de Bateria ("Green UX"):** Shaders complexos (como a iluminação global SSGI mencionada) consomem muita GPU. Em um site que o usuário visita por 2 minutos, tudo bem. Em um Webapp que fica aberto o dia todo, isso drenará a bateria do laptop do usuário.  
3. **Performance Híbrida:** A sincronização entre o HTML (React) e o WebGL (Three.js) pode causar "lag" se não for bem gerenciada. O uso de React Three Fiber ajuda a manter o estado sincronizado de forma eficiente.

**Conclusão:**

Para **Websites**, use a imersão para *encantar* e reter.

Para **Webapps**, use a tecnologia 3D para *visualizar* e *explicar*, mantendo a navegação crítica familiar e eficiente.

## **CONCLUSION: THE LIVING WEB**

The transition from "page" to "place" is not merely a stylistic choice; it is an evolution of the medium. It demands that we stop treating the browser as a document viewer and start treating it as a rendering engine for virtual reality. By combining spatial navigation, organic physics, atmospheric rendering, and spatial audio, we create a digital reality that the user inhabits. The result is not a document to be read, but a memory to be experienced. This is the future of the immersive web: a world where the line between the browser and reality is dissolved by light, math, and motion.

### ---

**Key Technology Reference Table**

| Category | Recommended Technology | Purpose |
| :---- | :---- | :---- |
| **Core Framework** | **React Three Fiber (R3F)** | Declarative scene graph, state management. |
| **Physics Engine** | **Rapier.js (via react-three-rapier)** | High-performance WASM rigid/soft body physics. |
| **Rendering** | **Three.js \+ WebGPU** | Fundamental 3D engine; WebGPU for compute shaders. |
| **UI/Text** | **Troika-Three-Text / Three-Mesh-UI** | SDF text rendering, spatial flexbox layouts. |
| **Post-Processing** | **React-Postprocessing** | Effect composer (Bloom, DoF, SSGI, Vignette). |
| **Animation** | **GSAP / Theater.js** | Timeline sequencing, cinematic camera paths. |
| **Math/Color** | **Maath** | Math helpers for damping, random generation. |
| **State** | **Zustand** | Transient state management (avoiding React re-renders). |

### **Citations**

1

#### **Referências citadas**

* How do you animate the camera with react-three-fiber? \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/75562296/how-do-you-animate-the-camera-with-react-three-fiber](https://stackoverflow.com/questions/75562296/how-do-you-animate-the-camera-with-react-three-fiber)  
* Camera Controls \- React Three Fiber Tutorial for Beginners \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=dsjS3eFAby0](https://www.youtube.com/watch?v=dsjS3eFAby0)  
* Change camera dynamically \#709 \- pmndrs react-three-fiber \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/pmndrs/react-three-fiber/discussions/709](https://github.com/pmndrs/react-three-fiber/discussions/709)  
* 48 Award-Winning Best Website Designs in 2025 \- SPINX Digital, acessado em fevereiro 2, 2026, [https://www.spinxdigital.com/blog/best-website-design/](https://www.spinxdigital.com/blog/best-website-design/)  
* How I Made 1 Million In One Year By Doing What I Like〡Bruno Simon〡AwwwardsConf Amsterdam \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=DkLg3fcV308](https://www.youtube.com/watch?v=DkLg3fcV308)  
* Coding a 3D Audio Visualizer with Three.js, GSAP & Web Audio API \- Codrops, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-with-three-js-gsap-web-audio-api/](https://tympanus.net/codrops/2025/06/18/coding-a-3d-audio-visualizer-with-three-js-gsap-web-audio-api/)  
* Troika Text for Three.js \- GitHub Pages, acessado em fevereiro 2, 2026, [https://protectwise.github.io/troika/troika-three-text/](https://protectwise.github.io/troika/troika-three-text/)  
* Troika Three Text \- Three.js Resources, acessado em fevereiro 2, 2026, [https://threejsresources.com/tool/troika-three-text](https://threejsresources.com/tool/troika-three-text)  
* Text \- Drei, acessado em fevereiro 2, 2026, [https://drei.docs.pmnd.rs/abstractions/text](https://drei.docs.pmnd.rs/abstractions/text)  
* THREE.js \- making a little squishy 3D ball \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/57987733/three-js-making-a-little-squishy-3d-ball](https://stackoverflow.com/questions/57987733/three-js-making-a-little-squishy-3d-ball)  
* How to make soft body interaction \- Questions \- three.js forum, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/how-to-make-soft-body-interaction/40021](https://discourse.threejs.org/t/how-to-make-soft-body-interaction/40021)  
* Spatial UI: Redefining Interaction in 3D Space — A UX Designer's Perspective \- Medium, acessado em fevereiro 2, 2026, [https://medium.com/@kirancrypto09/exploring-spatial-ui-the-future-of-immersive-interaction-a52587942d02](https://medium.com/@kirancrypto09/exploring-spatial-ui-the-future-of-immersive-interaction-a52587942d02)  
* Add Seamless Transition Animations Between Different Scenes | by hightopo \- Medium, acessado em fevereiro 2, 2026, [https://medium.com/@hightopo/add-seamless-transition-animations-between-different-scenes-ee0592cdb813](https://medium.com/@hightopo/add-seamless-transition-animations-between-different-scenes-ee0592cdb813)  
* codand/Unity3DPortals: A seamless portal implementation \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/codand/Unity3DPortals](https://github.com/codand/Unity3DPortals)  
* Beautiful and mind-bending effects with WebGL Render Targets \- Maxime Heckel's Blog, acessado em fevereiro 2, 2026, [https://blog.maximeheckel.com/posts/beautiful-and-mind-bending-effects-with-webgl-render-targets/](https://blog.maximeheckel.com/posts/beautiful-and-mind-bending-effects-with-webgl-render-targets/)  
* Three.js: Transition 2 Textures with Zoom and Blend Effects \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/46454729/three-js-transition-2-textures-with-zoom-and-blend-effects](https://stackoverflow.com/questions/46454729/three-js-transition-2-textures-with-zoom-and-blend-effects)  
* Can we zoom in or zoom out infinitely in Three.js without any limit? \- Questions, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/can-we-zoom-in-or-zoom-out-infinitely-in-three-js-without-any-limit/87618](https://discourse.threejs.org/t/can-we-zoom-in-or-zoom-out-infinitely-in-three-js-without-any-limit/87618)  
* Advice on "infinite zoom" story \- Questions \- three.js forum, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/advice-on-infinite-zoom-story/64035](https://discourse.threejs.org/t/advice-on-infinite-zoom-story/64035)  
* 10 Essential Trends in Web Design and Development for 2025 \- 2 Dam Creative, acessado em fevereiro 2, 2026, [https://2damcreative.com/10-essential-trends-in-web-design-and-development-for-2025/](https://2damcreative.com/10-essential-trends-in-web-design-and-development-for-2025/)  
* Getting started with Rapier / somethingelseentirely \- Observable, acessado em fevereiro 2, 2026, [https://observablehq.com/@somethingelseentirely/getting-started-with-rapier](https://observablehq.com/@somethingelseentirely/getting-started-with-rapier)  
* Simple vertex shader using three.js / Troy \- Observable, acessado em fevereiro 2, 2026, [https://observablehq.com/@troywatt/simple-vertex-shader-using-three-js](https://observablehq.com/@troywatt/simple-vertex-shader-using-three-js)  
* Real-Time Cloth Simulation Using WebGPU: Evaluating Limits of High-Resolution Cloth Model \- arXiv, acessado em fevereiro 2, 2026, [https://arxiv.org/html/2507.11794](https://arxiv.org/html/2507.11794)  
* Constraint-based cloth simulation on WebGPU compute shaders \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/webgpu/comments/1qelp0j/constraintbased\_cloth\_simulation\_on\_webgpu/](https://www.reddit.com/r/webgpu/comments/1qelp0j/constraintbased_cloth_simulation_on_webgpu/)  
* Your first WebGPU app \- Google Codelabs, acessado em fevereiro 2, 2026, [https://codelabs.developers.google.com/your-first-webgpu-app](https://codelabs.developers.google.com/your-first-webgpu-app)  
* Interactive Galaxy with WebGPU Compute Shaders | Three.js Roadmap, acessado em fevereiro 2, 2026, [https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders)  
* GPGPU particles with TSL & WebGPU \- Wawa Sensei, acessado em fevereiro 2, 2026, [https://wawasensei.dev/courses/react-three-fiber/lessons/tsl-gpgpu](https://wawasensei.dev/courses/react-three-fiber/lessons/tsl-gpgpu)  
* WebGPU — From Ping Pong WebGL To Compute Shader 🖥️ | by Phish Chiang \- Medium, acessado em fevereiro 2, 2026, [https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2)  
* WebGPU :: Creating A Particle System \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=nZNiroB1JYg](https://www.youtube.com/watch?v=nZNiroB1JYg)  
* Shell texturing vs raymarching \- Blog \- Procedural Pixels, acessado em fevereiro 2, 2026, [https://www.proceduralpixels.com/blog/shell-texturing-vs-raymarching](https://www.proceduralpixels.com/blog/shell-texturing-vs-raymarching)  
* Rendering Escape Fractals in Three.js | by April Walker \- Medium, acessado em fevereiro 2, 2026, [https://medium.com/@SereneBiologist/rendering-escape-fractals-in-three-js-68c96b385a49](https://medium.com/@SereneBiologist/rendering-escape-fractals-in-three-js-68c96b385a49)  
* Efficient volumetric clouds \- Resources \- three.js forum, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/efficient-volumetric-clouds/66067](https://discourse.threejs.org/t/efficient-volumetric-clouds/66067)  
* Filmic Effects in WebGL. post-processing with ThreeJS | by Matt DesLauriers | Medium, acessado em fevereiro 2, 2026, [https://medium.com/@mattdesl/filmic-effects-for-webgl-9dab4bc899dc](https://medium.com/@mattdesl/filmic-effects-for-webgl-9dab4bc899dc)  
* Screen Space Global Illumination in Threejs via WebGPU and React Three Fiber \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=Tq7OO9uWqko](https://www.youtube.com/watch?v=Tq7OO9uWqko)  
* SSGI \- Screen-Space global illumination \- Resources \- three.js forum, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/ssgi-screen-space-global-illumination/85190](https://discourse.threejs.org/t/ssgi-screen-space-global-illumination/85190)  
* Screen-Space Global Illumination effect in three.js : r/threejs \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/threejs/comments/xdipqn/screenspace\_global\_illumination\_effect\_in\_threejs/](https://www.reddit.com/r/threejs/comments/xdipqn/screenspace_global_illumination_effect_in_threejs/)  
* Signed distance field global illumination (SDFGI) \- Godot Docs, acessado em fevereiro 2, 2026, [https://docs.godotengine.org/en/stable/tutorials/3d/global\_illumination/using\_sdfgi.html](https://docs.godotengine.org/en/stable/tutorials/3d/global_illumination/using_sdfgi.html)  
* volumetric clouds \- game ready \- Resources \- three.js forum, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/volumetric-clouds-game-ready/86598](https://discourse.threejs.org/t/volumetric-clouds-game-ready/86598)  
* Stereoscopic volumetric clouds raymarched using raytracing acceleration \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/GraphicsProgramming/comments/1gv3zwd/stereoscopic\_volumetric\_clouds\_raymarched\_using/](https://www.reddit.com/r/GraphicsProgramming/comments/1gv3zwd/stereoscopic_volumetric_clouds_raymarched_using/)  
* Real-time dreamy Cloudscapes with Volumetric Raymarching \- The Blog of Maxime Heckel, acessado em fevereiro 2, 2026, [https://blog.maximeheckel.com/posts/real-time-cloudscapes-with-volumetric-raymarching/](https://blog.maximeheckel.com/posts/real-time-cloudscapes-with-volumetric-raymarching/)  
* postprocessing for react-three-fiber \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/pmndrs/react-postprocessing](https://github.com/pmndrs/react-postprocessing)  
* Chromatic Aberration | Post Processing | 3.5.1 \- Unity \- Manual, acessado em fevereiro 2, 2026, [https://docs.unity3d.com/Packages/com.unity.postprocessing@3.5/manual/Chromatic-Aberration.html](https://docs.unity3d.com/Packages/com.unity.postprocessing@3.5/manual/Chromatic-Aberration.html)  
* Chromatic Aberration | Post-processing \- TresJS, acessado em fevereiro 2, 2026, [https://post-processing.tresjs.org/guide/pmndrs/chromatic-aberration](https://post-processing.tresjs.org/guide/pmndrs/chromatic-aberration)  
* Web audio spatialization basics \- Web APIs \- MDN Web Docs \- Mozilla, acessado em fevereiro 2, 2026, [https://developer.mozilla.org/en-US/docs/Web/API/Web\_Audio\_API/Web\_audio\_spatialization\_basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)  
* Positional Audio In Three JS \- HRTF's \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/58767082/positional-audio-in-three-js-hrtfs](https://stackoverflow.com/questions/58767082/positional-audio-in-three-js-hrtfs)  
* Physics-Driven Diffusion Models for Impact Sound Synthesis from Videos, acessado em fevereiro 2, 2026, [https://sukun1045.github.io/video-physics-sound-diffusion/](https://sukun1045.github.io/video-physics-sound-diffusion/)  
* \[2303.16897\] Physics-Driven Diffusion Models for Impact Sound Synthesis from Videos \- arXiv, acessado em fevereiro 2, 2026, [https://arxiv.org/abs/2303.16897](https://arxiv.org/abs/2303.16897)  
* Procedural audio generation explained: A clear guide to sound design \- SFX Engine, acessado em fevereiro 2, 2026, [https://sfxengine.com/blog/procedural-audio-generation-explained](https://sfxengine.com/blog/procedural-audio-generation-explained)  
* React Three Fiber Tutorial \- Rapier Physics Engine \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=OpYtwrtpePY](https://www.youtube.com/watch?v=OpYtwrtpePY)  
* 25 Stunning Interactive Website Examples & Design Trends (2025) \- The Web Factory, acessado em fevereiro 2, 2026, [https://www.thewebfactory.us/blogs/25-stunning-interactive-website-examples-design-trends/](https://www.thewebfactory.us/blogs/25-stunning-interactive-website-examples-design-trends/)  
* Bruno Simon – 3D Portfolio | Hacker News, acessado em fevereiro 2, 2026, [https://news.ycombinator.com/item?id=46206531](https://news.ycombinator.com/item?id=46206531)  
* Bruno Simon Portfolio \- Awwwards SOTD, acessado em fevereiro 2, 2026, [https://www.awwwards.com/sites/bruno-simon-portfolio](https://www.awwwards.com/sites/bruno-simon-portfolio)  
* Bruno Simon's portfolio : r/webdev \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/webdev/comments/dmhmwb/bruno\_simons\_portfolio/](https://www.reddit.com/r/webdev/comments/dmhmwb/bruno_simons_portfolio/)  
* The Best of WebGPU in January 2025, acessado em fevereiro 2, 2026, [https://www.webgpuexperts.com/best-webgpu-updates-january-2025](https://www.webgpuexperts.com/best-webgpu-updates-january-2025)

# **The Sentient Canvas: A Manifesto on the State of Digital Immersion (2025-2026)**

## **Executive Summary**

The paradigm of web design has shifted irrevocably. We have moved beyond the "page" metaphor—a relic of print media that dominated the first three decades of the internet—and entered the era of the "simulation." As judges for the industry's highest honors, including Awwwards, the FWA, and the CSS Design Awards, we observe a distinct fracturing of the digital landscape. On one side lies the Utility Web: fast, minimalist, and increasingly AI-generated. On the other lies the Immersive Web: a domain of high-fidelity aesthetics, real-time physics, and surreal interactivity that functions less like a document and more like a living organism.

This report serves as an exhaustive, technical, and aesthetic deep-dive into the latter. It is a brainstorming resource for the visionary Art Director and the Creative Technologist, categorizing the bleeding edge of what is possible in a browser in 2025\. Drawing from the Site of the Year winners 1, emerging experimental repositories, and the latest W3C specifications 2, we analyze the transition from baked graphics to real-time compute shaders, from static navigation to intent-based generative interfaces, and from silence to spatial sonic architectures. The features detailed herein represent the "Digital Avant-Garde"—the technologies that are currently defining the benchmark for excellence in digital design.

## ---

**Part I: Immersive Visuals – The GPU Singularity**

The most defining characteristic of the 2025 creative web is the migration of heavy computation from the CPU to the GPU. With the stabilization of WebGPU and the maturity of high-level shading languages, the browser has effectively become a game engine. We are no longer approximating reality; we are simulating it.

### **1.1 The WebGPU Era and The Death of Rasterization**

For over a decade, WebGL (based on OpenGL ES) was the ceiling for web graphics. It was strictly a rasterization engine, designed to draw triangles to a screen. To achieve complex effects, developers had to employ sophisticated "hacks" within fragment shaders. WebGPU changes the fundamental architecture of web graphics by introducing the **Compute Shader**—a programmable stage that allows the GPU to perform general-purpose calculations on arbitrary data, not just pixels.3

#### **1.1.1 Compute Shaders and Parallelism**

The implication of compute shaders for creative coding cannot be overstated. In a traditional WebGL flocking simulation (e.g., simulating a school of fish), the CPU would calculate the position of each fish and upload that data to the GPU every frame. This created a bottleneck, capping simulations at a few thousand entities. With WebGPU compute shaders, the logic resides entirely on the GPU. The position, velocity, and collision logic for hundreds of thousands of particles are calculated in parallel, freeing the CPU for other tasks.3 This allows for "living" backgrounds where millions of dust motes, rain droplets, or geometric shards react individually to user interaction without dropping below 60 frames per second.

#### **1.1.2 TSL: The Three Shading Language**

To manage this complexity, the Three.js ecosystem has introduced TSL (Three Shading Language). TSL represents a shift toward a node-based, composable architecture for shader creation. Unlike writing raw GLSL strings, which are brittle and difficult to debug, TSL allows developers to construct materials using JavaScript objects that compile down to optimized WGSL (WebGPU Shading Language).3

**Table 1.1: WebGL vs. WebGPU Architecture for Creative Coding**

| Feature | WebGL (Legacy) | WebGPU (Current Standard) | Creative Implication |
| :---- | :---- | :---- | :---- |
| **Pipeline** | Fixed Graphics Pipeline | Graphics & Compute Pipelines | Enables physics, sorting, and AI on the GPU.4 |
| **Shading Lang** | GLSL (String-based) | WGSL / TSL (Node-based) | Modular, reusable shader components; "No-code" visual editor compatibility.5 |
| **Resource Binding** | High CPU Overhead | Low Overhead (Bind Groups) | massive draw call reduction; complex scenes with thousands of unique objects.6 |
| **Raytracing** | Impossible (Simulated) | Native Support (Compute) | Real-time global illumination, reflections, and true shadows.7 |

### **1.2 Real-Time Raytracing and Path Tracing**

We are witnessing the first generation of web experiences that utilize real-time raytracing. This technique, once reserved for offline rendering farms or high-end console gaming, calculates the path of light rays as they bounce through a scene.

#### **1.2.1 Bounding Volume Hierarchies (BVH) in the Browser**

Current experimental libraries are implementing Bounding Volume Hierarchies (BVH) within compute shaders. The BVH is a tree structure that organizes the geometry of a scene, allowing the raytracer to quickly discard objects that a light ray will not hit. By traversing this tree on the GPU, developers can render scenes with complex geometry—glass, metal, water—with physically accurate reflections and refractions.7 This allows for the creation of "digital twins" of luxury products (perfume bottles, jewelry, automotive parts) that are indistinguishable from video, yet fully interactive.

#### **1.2.2 Hybrid Rendering Techniques**

To maintain performance on lower-end devices (like mobile phones), the industry is adopting hybrid rendering. This involves rendering the base geometry using traditional rasterization (which is fast) and then using ray-marching for specific, high-cost effects like soft shadows, ambient occlusion, or volumetric fog. This technique ensures that the "Atmosphere" of the site remains dense and cinematic without compromising the framerate.8

### **1.3 Fluid Dynamics: The Navier-Stokes Equations**

Fluidity is the dominant aesthetic of the 2025 web. However, the "wavy" look of 2023—often achieved with simple sine wave vertex displacement—has been replaced by true fluid dynamics simulations solving the Navier-Stokes equations in real-time.

#### **1.3.1 Screen-Space Fluid Rendering (SSFR)**

The "Splash" library exemplifies the state-of-the-art in browser-based fluids. It utilizes a technique called Screen-Space Fluid Rendering (SSFR). Instead of generating a heavy 3D mesh for the water (which would require "Marching Cubes" and be very slow), the engine renders thousands of particles as simple spheres. It then smoothes the depth map of these spheres to create a continuous surface.9

The innovation lies in the **Narrow-Range Filter**. Traditional smoothing filters (like the Bilateral Filter) often make the water look like jelly or mercury because they blur the edges too aggressively. The Narrow-Range Filter preserves the sharp curvature of small droplets while smoothing the main body of liquid. This allows for high-fidelity rendering of splashes, foam, and chaotic turbulence.10

#### **1.3.2 Ray-Marched Volumetric Shadows**

A critical weakness of previous web fluid demos was the lack of depth perception; water looked like a flat, distorted texture. Modern implementations use ray-marching through the density grid of the simulation to calculate how light passes through the water volume. This creates varying shades of color based on the thickness of the liquid (the Beer-Lambert law), resulting in deep, rich oceans that look terrifyingly real.11

### **1.4 Advanced Materiality: Glassmorphism and Dispersion**

The aesthetic trend of "Glassmorphism" continues to evolve, moving away from simple blurring (CSS backdrop-filter) toward physically correct transmission.

#### **1.4.1 The MeshTransmissionMaterial Standard**

In the React Three Fiber (R3F) ecosystem, the MeshTransmissionMaterial has become the standard for rendering glass. Unlike standard transparency, which simply mixes the pixel color with the background, transmission calculates what happens to the image *behind* the object. It simulates the refraction of light as it passes through a medium with a specific Index of Refraction (IOR).12

#### **1.4.2 Chromatic Aberration and Anisotropy**

The "premium" look in modern web design is often defined by imperfection. Perfect 3D renders look sterile. To combat this, creative technologists add optical flaws:

* **Chromatic Aberration:** This simulates the failure of a lens to focus all colors to the same point. By splitting the Red, Green, and Blue channels at the edges of the glass object, developers create a "spectral" or "rainbow" effect that implies high refractive density (like a diamond or cut crystal).14  
* **Anisotropy:** This parameter simulates micro-grooves on a surface (like brushed metal or the back of a CD). When applied to glass, it stretches the reflections, giving the object a tactile, machined quality that reacts dynamically as the user rotates the view.14

### **1.5 Case Study: Lusion v3 – The Benchmark of Optimization**

The portfolio of Lusion (Lusion v3) remains the gold standard for high-performance immersive visuals. It demonstrates that the most futuristic features often rely on the most creative "hacks" to bypass browser limitations.16

**Analysis of Technical Ingenuity:**

The Lusion team faced a problem: they wanted a high-fidelity 3D character (a mannequin) to fly through the scene, reacting to wind and light. Standard skeletal animation (glTF) was too heavy for the amount of data required.

* **LZW Compression in PNGs:** Instead of storing animation data in heavy JSON files, Lusion encoded the position and rotation data of the mannequin's vertices into the RGB pixels of a PNG image. They used LZW compression (native to the PNG format) to compress this data efficiently. This allows the browser to load complex animation data as a simple image file, which is decoded on the GPU.18  
* **The readPixels Hack:** To synchronize the 3D scene with the video background, they encoded a binary frame counter into the invisible pixels of the video file. Using the WebGL readPixels() function, they read this counter every frame to ensure the 3D elements (lights, reflections) were perfectly synced with the pre-rendered video footage.18 This level of synchronization creates a seamless blend between real-time graphics and cinematic video, blurring the line between "website" and "film."

## ---

**Part II: Hyper-Interaction – The Tangible Web**

"Hyper-Interaction" defines a user experience philosophy where the digital environment reacts to the user with the fidelity of the physical world. The era of the "click" is ending; we are entering the era of the "gesture," the "throw," and the "collision."

### **2.1 The Physics of Interface: Rapier.js and Matter.js**

Static interfaces are being replaced by dynamic, physics-based environments where UI elements have mass, friction, and restitution.

#### **2.1.1 WASM-Powered 3D Physics**

The industry standard for 3D physics on the web has shifted to **Rapier.js**. Written in Rust and compiled to WebAssembly (WASM), Rapier is significantly faster and more stable than older JavaScript libraries like Cannon.js.19

* **Rigid Body UI:** In a React Three Fiber environment, developers wrap standard UI components (images, product cards) in \<RigidBody\> tags. This instantly gives them physical properties. Users can "flick" a product card, and it will slide across the screen, decelerating due to friction, and bounce off the edge of the viewport.21  
* **Deterministic Simulation:** Because Rapier runs in WASM, the simulation is deterministic. This means the physics will behave exactly the same way on every device, which is crucial for gameplay and consistent user experience.20

#### **2.1.2 2D Hybrid DOM Physics**

For 2D websites, **Matter.js** is used to create "mixed reality" DOM rendering. This technique involves running a physics simulation in the background but applying the calculated positions to standard HTML elements using CSS transforms.22

* **The "Footer Drop":** A popular trend is the "Footer Drop," where the elements of the footer (copyright, links, logos) fall from the top of the container and pile up at the bottom like physical blocks. Users can drag these blocks, throw them, and watch them collide. This turns a boring, utility-focused section of the site into a playground.22

### **2.2 The Multi-Window Paradigm**

One of the most surreal and avant-garde trends is the **Multi-Window Experience**, where a single application spans across multiple browser windows that communicate in real-time. This shatters the "sandbox" illusion, turning the user's entire desktop into the canvas.23

#### **2.2.1 The Window Management API**

The new **Window Management API** (formerly Multi-Screen Window Placement API) allows web apps to query the user's monitor setup and place windows at specific coordinates.25

* **Spatial Awareness:** By comparing window.screenLeft and window.screenTop (the window's position on the monitor) with window.innerWidth and window.innerHeight, the application can calculate the exact spatial relationship between two open windows.  
* **The "Elmer" Effect:** Google's "Elmer" demo illustrates this perfectly. An image of an elephant is split across several pop-up windows. As the user drags the windows around their desktop, the image within each window updates to reveal the correct portion of the "global" image. It feels as if the browser windows are merely viewports looking into a static world that exists "behind" the screen.27

#### **2.2.2 SharedWorker Synchronization**

To achieve high-performance synchronization between windows (e.g., a ball bouncing from Window A to Window B), developers use a **SharedWorker**. The SharedWorker acts as a local server running in the browser background.

* **Mechanism:** All open windows connect to the SharedWorker. The worker runs the physics loop. When a ball moves out of the coordinates of Window A and into the coordinates of Window B, the worker tells Window A to stop rendering it and Window B to start. This handoff happens in milliseconds, creating the illusion of a continuous physical space spanning multiple windows.28

### **2.3 Rive and The State Machine Cursor**

The cursor is the user's avatar in the digital space. 2025 sees the rise of the **State Machine Cursor**, powered by Rive.

#### **2.3.1 Vector Interactivity**

Rive is a real-time interactive vector animation tool. Unlike Lottie (which is just playback), Rive animations are driven by state machines.29

* **Blend States:** A Rive cursor can blend between animations based on input. If the user moves the mouse left, the "Looking Left" animation blends in. If the user hovers over a clickable element, the "Excited" state blends in. This is controlled by numerical inputs (xAxis, yAxis, hoverStrength) passed from the JavaScript runtime to the Rive engine.30  
* **Bone Constraints:** Rive allows for inverse kinematics (IK) and bone constraints. A character's eyes can track the mouse position precisely, or a tentacle can reach out to touch a button, all calculated in real-time at 60fps.31

### **2.4 Case Study: Opal Tadpole – The Hardware Feel**

The Opal Tadpole website 32 is a masterclass in "Tangible Web Design." It uses interaction to convey the physical qualities of the hardware product.

* **Scroll-Driving:** The site does not scroll vertically. Instead, the user's scroll wheel inputs energy into a spline path. The camera (the 3D model of the product) travels along this path. Crucially, the movement has inertia and damping. When the user stops scrolling, the camera glides to a stop, simulating the weight and friction of a physical object. This subconscious cue tells the user "this product is solid, heavy, and premium".32  
* **Directional Mic Visualization:** To demonstrate the directional microphone, the site visualizes sound waves as physical particles that are blocked by a "cone of silence" around the device. This is not a video; it is a real-time particle simulation that reacts to the user's mouse, allowing them to "test" the microphone shielding visually.32

## ---

**Part III: AI & Personalization – The Generative Interface**

Artificial Intelligence has moved beyond the "chatbot bubble" to become the architectural substrate of the user interface. We are entering the era of **Generative UI (GenUI)**, where the interface is not pre-designed but *generated* on the fly to match the user's specific intent.

### **3.1 Generative UI and Component Streaming**

The Vercel AI SDK and React Server Components (RSC) have popularized the concept of streaming UI. Instead of an LLM returning text, it returns a stream of fully functional React components.34

#### **3.1.1 The "Tool Call" Workflow**

The mechanism behind GenUI relies on "Function Calling" or "Tool Use."

* **Definition:** The developer defines a set of tools (e.g., showStockChart, bookMeeting, displayProductGrid) and maps them to React components.  
* **Intent Analysis:** When a user types a prompt (e.g., "Show me the price of Bitcoin vs. Ethereum"), the AI model analyzes the intent. It realizes it needs to display data, so it calls the showStockChart tool.  
* **Component Streaming:** The server executes the tool (fetching the data) and then streams the \<StockChart /\> component to the client. The user sees a live, interactive chart appear in the chat stream, not just a text description.36

#### **3.1.2 Dynamic Dashboards (Bento Box 3.0)**

This technology enables "Intent-Based Dashboards." A financial app might have no default homepage. If the user is a day trader, the AI generates a dashboard filled with high-density "Bento Box" modules (charts, tickers, order books).38 If the user is a long-term investor, the AI generates a simplified, spacious layout focusing on portfolio growth and news. The UI structure itself is fluid.35

### **3.2 Client-Side AI and Privacy**

The release of Chrome's built-in AI APIs (Gemini Nano) allows for powerful AI features to run directly in the browser, without sending data to a server.39

#### **3.2.1 The Prompt API**

The **Prompt API** allows developers to send natural language prompts to the local browser model. This can be used for:

* **Real-time Form Assistance:** As a user types in a "Contact Us" form, the local AI can suggest improvements to their message or auto-correct tone without any latency or privacy concerns.39  
* **Content Summarization:** A "Summarize" button that instantly condenses a long article or Terms of Service document using the browser's native capabilities.39

### **3.3 Hyper-Personalization: The "Human Signal"**

As AI content proliferates, there is a counter-trend toward "The Human Signal" or "Luxury of Imperfection." However, AI is being used to *curate* this human experience.38

#### **3.3.1 Predictive User Journeys**

Brands like Sephora and PUMA are using AI to predict user intent before a search is performed. By analyzing mouse movement, dwell time, and past purchase history, the AI restructures the navigation menu in real-time. If the AI detects "dry skin" concerns based on browsing history, the "Skincare" dropdown might automatically highlight "Hydrating Serums" or move that category to the top of the list.41

#### **3.3.2 The End of Search**

The trend "Intent-Based UI and The End of Searching" suggests that the traditional search bar is being replaced by a command center. Instead of searching for keywords, users state their goal ("I want to look fresh for a summer wedding"), and the AI generates a custom landing page with a curated selection of products, styling tips, and lookbooks, effectively creating a bespoke website for that single query.38

## ---

**Part IV: Audio & Atmosphere – Sonic Architecture**

In 2025, audio is treated with the same hierarchy as visual elements. The "mute by default" dogma is being challenged by "opt-in immersion" where sound provides spatial feedback and emotional texture.

### **4.1 Spatial Audio and The PannerNode**

The Web Audio API's PannerNode is essential for 3D web experiences. It spatializes audio sources based on the user's camera position within the WebGL scene.43

#### **4.1.1 3D Soundscapes**

Libraries like **Eclipsa Audio** (Google/Samsung) are standardizing spatial audio on the web.44

* **Implementation:** In a Three.js scene, an \<AudioListener\> is attached to the camera, and \<PositionalAudio\> is attached to 3D objects. As the user navigates a virtual art gallery, the sound of a video installation is directional. If the video is to the left, the sound comes from the left speaker. As the user walks away, the volume decays based on a logarithmic roll-off model.  
* **Doppler Effect:** The PannerNode automatically calculates the Doppler effect based on the velocity of the listener and the source. If a user zooms past a sounding object, the pitch shifts up and then down, adding a visceral sense of speed to the navigation.43

### **4.2 Generative Music: Tone.js**

Static MP3 loops are being replaced by generative scores that never repeat. **Tone.js** serves as the backbone for these experiences, providing a DAW (Digital Audio Workstation) structure in the browser.45

#### **4.2.1 Markov Chains and Probability**

Developers are using Markov chains to generate infinite melodies that adhere to a specific mood or scale. A Markov chain analyzes a set of "training" melodies and calculates the probability of Note B following Note A. It then uses these probabilities to generate new, unique melodies that sound coherent but never repetitive.46

* **Example:** A background ambient track might have a "Cloud" synth. The sequencer is set to play a note every bar, but with a probability of 70%. The reverb decay time is linked to the scroll depth. As the user scrolls "deeper" into the page, the reverb tail gets longer, creating a sense of descending into a vast cavern.47

## ---

**Part V: The Surreal – Experimental Architectures**

The final category encompasses the bleeding edge—experiments that reject utility in favor of awe, confusion, and art. This is the domain of "The Surreal," where browser APIs are misused to create "glitch" aesthetics and impossible geometries.

### **5.1 WebXR and Markerless AR**

The boundary between the screen and the room is dissolving via **WebXR** and **Hit Testing**.

#### **5.1.1 The Hit Test API**

The **WebXR Hit Test API** allows the browser to understand the geometry of the real world through the device's camera without a dedicated app.48

* **Mechanism:** It casts a ray from the device screen into the real world. If the underlying AR system (ARCore/ARKit) detects a plane (like a floor or table), the hit test returns the coordinates of that intersection.  
* **Use Case:** A fashion brand allows users to place a virtual runway in their living room. Models walk out onto the user's floor. The lighting on the models matches the estimated lighting of the room (using AR Lighting Estimation), integrating the virtual and physical seamlessly.49

### **5.2 Surreal Browser APIs**

Developers are leveraging experimental browser APIs to break the "fourth wall" of the web page.

#### **5.2.1 The EyeDropper API**

The **EyeDropper API** allows web applications to sample colors from *anywhere* on the user's screen, even outside the browser window.51

* **Creative Use:** A "Chameleon" website that changes its color scheme to match the user's desktop wallpaper or the window of another app they have open. This blurs the line between the website and the operating system.

#### **5.2.2 The View Transitions API**

The **View Transitions API** enables seamless morphing between DOM states. It allows a thumbnail on a listing page to morph into the hero image on the detail page without a hard cut.51

* **Surreal Transitions:** Experimental sites use this to create "melting" transitions. When a user clicks a link, the current page appears to liquefy and drip down the screen, revealing the next page underneath. This is achieved by capturing a snapshot of the old state, applying a CSS distortion filter, and cross-fading to the new state.52

### **5.3 The Aesthetic of "Weirdcore" and Glitch**

Aesthetically, these technologies converge in a style often called "Weirdcore" or "Acid Graphics." It combines high-tech rendering with low-fi artifacts.

* **Pixelation Shaders:** Using WebGPU to render a photorealistic 3D scene and then purposefully downscaling it to a low resolution, creating a "PlayStation 1" aesthetic with jittery vertices and affine texture mapping artifacts.  
* **Impossible Geometry:** Utilizing the stencil buffer in WebGL/WebGPU to create non-Euclidean spaces—portals that look small on the outside but contain infinite worlds on the inside (similar to the "Tardis" effect). This is frequently used in "Virtual Gallery" templates to fit massive exhibitions into small virtual footprints.53

## ---

**Conclusion: The Era of World-Building**

The convergence of WebGPU, AI-driven personalization, haptic interaction, and spatial audio suggests that the future of the web is not about "designing pages" but "building worlds." The "World-Class Creative Technologist" of 2025 is effectively a game designer, a sound engineer, and an architect rolled into one.

The sites that win Awwwards and FWA in this era are those that successfully hide the browser chrome, creating a self-contained reality. Whether it is through a multi-window experiment that turns the desktop into a playground, or a generative UI that constructs itself in real-time, the goal is total immersion. The technology is no longer a constraint; it is a medium of infinite plasticity, limited only by the creator's ability to simulate—and stimulate—the human sensorium.

## **Detailed Technology Reference**

To assist in the brainstorming and implementation of these features, the following reference table maps the high-level concepts to specific libraries and APIs currently in use by top-tier agencies (Ingamana, Lusion, Active Theory).

**Table 6.1: The 2025 Creative Tech Stack**

| Category | Primary Technology | Key Libraries/Tools | Use Case |
| :---- | :---- | :---- | :---- |
| **Visuals** | **WebGPU** | Three.js (TSL), Orillusion, Splash | Real-time raytracing, fluid sims, massive particle systems.4 |
| **Visuals** | **Shaders** | React-Three-Fiber, Lamina, TSL | Glassmorphism, dispersion, custom material composition.5 |
| **Physics** | **WASM Physics** | Rapier.js, Havok | High-performance 3D collision, vehicle dynamics, character controllers.19 |
| **Interaction** | **State Machines** | Rive, XState | Cursor avatars, interactive vector graphics, complex logic flows.29 |
| **Interaction** | **Window Mgmt** | Window Management API | Multi-screen apps, cross-window physics, projector setups.25 |
| **AI** | **Generative UI** | Vercel AI SDK, LangChain | Streaming React components, intent prediction, dynamic layouts.34 |
| **Audio** | **Web Audio** | Tone.js, Howler.js | Generative scores, spatial audio, spectral analysis.45 |
| **Browser** | **Experimental** | EyeDropper, View Transitions | Color sampling, seamless navigation morphs.51 |

## **Insight: The Strategic Value of "Heavy" Web**

A counter-intuitive insight emerging from this research is the strategic return of "heaviness." For a decade, web performance metrics (Core Web Vitals) pushed for lightness and speed. However, the "Site of the Year" winners 1 often ignore these metrics in favor of "Loading Experiences." The user is willing to wait—if the payoff is an experience that transcends the browser. The "loading bar" has returned not as a nuisance, but as a portal—an airlock transitioning the user from their mundane desktop into the curated reality of the brand. This marks a bifurcation of the web: the **Utility Web** (instant, AI-optimized, minimalist) and the **Immersive Web** (heavy, simulated, surreal). The visionary Art Director knows exactly which side of this divide their project must inhabit.

### **Citations**

1

#### **Referências citadas**

* Sites Of The Year \- Awwwards, acessado em fevereiro 2, 2026, [https://www.awwwards.com/websites/sites\_of\_the\_year/](https://www.awwwards.com/websites/sites_of_the_year/)  
* GPU for the Web Working Group Charter \- W3C, acessado em fevereiro 2, 2026, [https://www.w3.org/2025/01/gpuweb-charter.html](https://www.w3.org/2025/01/gpuweb-charter.html)  
* Field Guide to TSL and WebGPU \- The Blog of Maxime Heckel, acessado em fevereiro 2, 2026, [https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/](https://blog.maximeheckel.com/posts/field-guide-to-tsl-and-webgpu/)  
* WebGPU finally on Web \- Evergine, acessado em fevereiro 2, 2026, [https://evergine.com/webgpu-finally-on-web/](https://evergine.com/webgpu-finally-on-web/)  
* TSL – three.js docs, acessado em fevereiro 2, 2026, [https://threejs.org/docs/pages/TSL.html](https://threejs.org/docs/pages/TSL.html)  
* The Best of WebGPU in January 2025, acessado em fevereiro 2, 2026, [https://www.webgpuexperts.com/best-webgpu-updates-january-2025](https://www.webgpuexperts.com/best-webgpu-updates-january-2025)  
* WebGPU Raytracer \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/webgpu/comments/196esek/webgpu\_raytracer/](https://www.reddit.com/r/webgpu/comments/196esek/webgpu_raytracer/)  
* A collection of WebGL and WebGPU frameworks and libraries \- GitHub Gist, acessado em fevereiro 2, 2026, [https://gist.github.com/dmnsgn/76878ba6903cf15789b712464875cfdc](https://gist.github.com/dmnsgn/76878ba6903cf15789b712464875cfdc)  
* LinzhouLi/WebGPU-Fluid-Simulation \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/LinzhouLi/WebGPU-Fluid-Simulation](https://github.com/LinzhouLi/WebGPU-Fluid-Simulation)  
* matsuoka-601/Splash: Another interactive 3D fluid simulation in WebGPU \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/matsuoka-601/Splash](https://github.com/matsuoka-601/Splash)  
* Splash: A Real-Time Fluid Simulation in Browsers Implemented in WebGPU \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/GraphicsProgramming/comments/1jh3pd2/splash\_a\_realtime\_fluid\_simulation\_in\_browsers/](https://www.reddit.com/r/GraphicsProgramming/comments/1jh3pd2/splash_a_realtime_fluid_simulation_in_browsers/)  
* Playing with Light and Refraction in Three.js: Warping 3D Text Inside a Glass Torus, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2025/03/13/warping-3d-text-inside-a-glass-torus/](https://tympanus.net/codrops/2025/03/13/warping-3d-text-inside-a-glass-torus/)  
* How to Make a 3D Glass Effect using Three.js and React \- Olivier Larose's Blog, acessado em fevereiro 2, 2026, [https://blog.olivierlarose.com/tutorials/3d-glass-effect](https://blog.olivierlarose.com/tutorials/3d-glass-effect)  
* How to achieve this glass material with a rainbow-like effect? \- three.js forum, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/how-to-achieve-this-glass-material-with-a-rainbow-like-effect/49614](https://discourse.threejs.org/t/how-to-achieve-this-glass-material-with-a-rainbow-like-effect/49614)  
* Chromatic Aberration \- Unity \- Manual, acessado em fevereiro 2, 2026, [https://docs.unity3d.com/560/Documentation/Manual/PostProcessing-ChromaticAberration.html](https://docs.unity3d.com/560/Documentation/Manual/PostProcessing-ChromaticAberration.html)  
* Lusion v3 \- CSS Design Awards, acessado em fevereiro 2, 2026, [https://www.cssdesignawards.com/sites/lusion-v3/44311](https://www.cssdesignawards.com/sites/lusion-v3/44311)  
* Lusion v3 \- The FWA, acessado em fevereiro 2, 2026, [https://thefwa.com/cases/lusion-v3](https://thefwa.com/cases/lusion-v3)  
* Case Study of Lusion by Lusion: Winner of Site of the Month May \- Awwwards, acessado em fevereiro 2, 2026, [https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html](https://www.awwwards.com/case-study-for-lusion-by-lusion-winner-of-site-of-the-month-may.html)  
* React Three Fiber Tutorial \- Rapier Physics Engine \- Wawa Sensei, acessado em fevereiro 2, 2026, [https://wawasensei.dev/tuto/react-three-fiber-tutorial-rapier-physics-engine](https://wawasensei.dev/tuto/react-three-fiber-tutorial-rapier-physics-engine)  
* Adding Physics to Three.js with Rapier \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=agNZuqehHtg](https://www.youtube.com/watch?v=agNZuqehHtg)  
* pmndrs/react-three-rapier: Rapier physics in React \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/pmndrs/react-three-rapier](https://github.com/pmndrs/react-three-rapier)  
* Using Matter.js to render to the DOM or React \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/63906218/using-matter-js-to-render-to-the-dom-or-react](https://stackoverflow.com/questions/63906218/using-matter-js-to-render-to-the-dom-or-react)  
* AimanGameDev/Multi-Window-Platformer-Game-Unity-Editor \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/AimanGameDev/Multi-Window-Platformer-Game-Unity-Editor?](https://github.com/AimanGameDev/Multi-Window-Platformer-Game-Unity-Editor)  
* bgstaal/multipleWindow3dScene: A quick example of how one can "synchronize" a 3d scene across multiple windows using three.js and localStorage \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/bgstaal/multipleWindow3dScene](https://github.com/bgstaal/multipleWindow3dScene)  
* Manage several displays with the Window Management API | Capabilities, acessado em fevereiro 2, 2026, [https://developer.chrome.com/docs/capabilities/web-apis/window-management](https://developer.chrome.com/docs/capabilities/web-apis/window-management)  
* Window Management \- Chrome Platform Status, acessado em fevereiro 2, 2026, [https://chromestatus.com/feature/5252960583942144](https://chromestatus.com/feature/5252960583942144)  
* Multi-Screen Window Management API Demo, acessado em fevereiro 2, 2026, [https://googlechrome.github.io/samples/window-management/](https://googlechrome.github.io/samples/window-management/)  
* Basic concepts of sharing data between browser windows \- Christian Noss, acessado em fevereiro 2, 2026, [https://cnoss.github.io/multi-window-experiences/](https://cnoss.github.io/multi-window-experiences/)  
* Example: Pointer Tracking \- Riveflow \- Webflow, acessado em fevereiro 2, 2026, [https://riveflow.webflow.io/examples-2/pointer-tracking](https://riveflow.webflow.io/examples-2/pointer-tracking)  
* Rive State Machine Tutorial \- Interactive Animation \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=acbUvtjUZSY](https://www.youtube.com/watch?v=acbUvtjUZSY)  
* Rive Pointer Tracking Animation Implemented in Webflow \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=MCJ7D9we-aY](https://www.youtube.com/watch?v=MCJ7D9we-aY)  
* Opal Tadpole — The first portable webcam, acessado em fevereiro 2, 2026, [https://opalcamera.com/opal-tadpole](https://opalcamera.com/opal-tadpole)  
* Opal's Tadpole proves webcams don't need to be big or boring \- Engadget, acessado em fevereiro 2, 2026, [https://www.engadget.com/opal-tadpole-webcam-140025595.html](https://www.engadget.com/opal-tadpole-webcam-140025595.html)  
* A Complete Guide to Vercel's AI SDK \- Codecademy, acessado em fevereiro 2, 2026, [https://www.codecademy.com/article/guide-to-vercels-ai-sdk](https://www.codecademy.com/article/guide-to-vercels-ai-sdk)  
* Multi-Step & Generative UI | Vercel Academy, acessado em fevereiro 2, 2026, [https://vercel.com/academy/ai-sdk/multi-step-and-generative-ui](https://vercel.com/academy/ai-sdk/multi-step-and-generative-ui)  
* Generative User Interfaces \- AI SDK UI, acessado em fevereiro 2, 2026, [https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces)  
* Vercel AI SDK Overview Tutorial | Generative UI, Streaming, Agentic Tool Functions, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=D48I3Nd0E5U](https://www.youtube.com/watch?v=D48I3Nd0E5U)  
* Top UI Design Trends to Future-Proof Your Growth \- Gapsy Studio, acessado em fevereiro 2, 2026, [https://gapsystudio.com/blog/up-to-date-ui-design-trends/](https://gapsystudio.com/blog/up-to-date-ui-design-trends/)  
* Built-in AI APIs | AI on Chrome \- Chrome for Developers, acessado em fevereiro 2, 2026, [https://developer.chrome.com/docs/ai/built-in-apis](https://developer.chrome.com/docs/ai/built-in-apis)  
* Which Are the Best Examples of AI-Powered Personalization in UI Design? \- Corizo, acessado em fevereiro 2, 2026, [https://corizo.in/which-are-the-best-examples-of-ai-powered-personalization-in-ui-design/](https://corizo.in/which-are-the-best-examples-of-ai-powered-personalization-in-ui-design/)  
* 6 Website Personalization Examples to Inspire You | SAP Emarsys, acessado em fevereiro 2, 2026, [https://emarsys.com/learn/blog/website-personalization-examples/](https://emarsys.com/learn/blog/website-personalization-examples/)  
* 7 Creative Examples Of How AI Powered Personalization Can Trigger More Engagement, acessado em fevereiro 2, 2026, [https://www.techaheadcorp.com/blog/7-creative-examples-of-how-ai-powered-personalization-can-trigger-more-engagement/](https://www.techaheadcorp.com/blog/7-creative-examples-of-how-ai-powered-personalization-can-trigger-more-engagement/)  
* Web audio spatialization basics \- Web APIs \- MDN Web Docs \- Mozilla, acessado em fevereiro 2, 2026, [https://developer.mozilla.org/en-US/docs/Web/API/Web\_Audio\_API/Web\_audio\_spatialization\_basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)  
* Introducing Eclipsa Audio: immersive audio for everyone | Google Open Source Blog, acessado em fevereiro 2, 2026, [https://opensource.googleblog.com/2025/01/introducing-eclipsa-audio-immersive-audio-for-everyone.html](https://opensource.googleblog.com/2025/01/introducing-eclipsa-audio-immersive-audio-for-everyone.html)  
* Tone.js, acessado em fevereiro 2, 2026, [https://tonejs.github.io/](https://tonejs.github.io/)  
* Making Procedural Music in JavaScript\! \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=tZN5Vzs\_82A](https://www.youtube.com/watch?v=tZN5Vzs_82A)  
* Generative Processes \- F2022 \- Week 6 \- Oscillators in Tone.js \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=hgg3ZBLRH58](https://www.youtube.com/watch?v=hgg3ZBLRH58)  
* three.js/examples/webxr\_ar\_hittest.html at dev · mrdoob/three.js · GitHub, acessado em fevereiro 2, 2026, [https://github.com/mrdoob/three.js/blob/dev/examples/webxr\_ar\_hittest.html](https://github.com/mrdoob/three.js/blob/dev/examples/webxr_ar_hittest.html)  
* hit test \- three.js ar, acessado em fevereiro 2, 2026, [https://threejs.org/examples/webxr\_ar\_hittest.html](https://threejs.org/examples/webxr_ar_hittest.html)  
* Hit Testing in a WebXR AR Experience using Three.JS \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=1HXJJAPJ7TI](https://www.youtube.com/watch?v=1HXJJAPJ7TI)  
* Top 10 Underrated JavaScript APIs You Should Be Using in 2025 \- Growin, acessado em fevereiro 2, 2026, [https://www.growin.com/blog/top-10-underrated-javascript-apis-in-2025/](https://www.growin.com/blog/top-10-underrated-javascript-apis-in-2025/)  
* Frontend & Design: 2025 Year in Review \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=KMErXW8oz7k](https://www.youtube.com/watch?v=KMErXW8oz7k)  
* WebGL & WebGPU BOF \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=gdMtgJTe1qY](https://www.youtube.com/watch?v=gdMtgJTe1qY)  
* Add dispersion to glass-like physical mesh material : r/threejs \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/threejs/comments/utcwog/add\_dispersion\_to\_glasslike\_physical\_mesh\_material/](https://www.reddit.com/r/threejs/comments/utcwog/add_dispersion_to_glasslike_physical_mesh_material/)  
* Top 5 UX/UI Design Trends in 2025: The Future of User Experiences \- FullStack Labs, acessado em fevereiro 2, 2026, [https://www.fullstack.com/labs/resources/blog/top-5-ux-ui-design-trends-in-2025-the-future-of-user-experiences](https://www.fullstack.com/labs/resources/blog/top-5-ux-ui-design-trends-in-2025-the-future-of-user-experiences)  
* Opal Tadpole \- Awwwards SOTD, acessado em fevereiro 2, 2026, [https://www.awwwards.com/sites/opal-tadpole](https://www.awwwards.com/sites/opal-tadpole)  
* I made a realistic water shader with WebGPU/TSL : r/threejs \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/threejs/comments/1pf93l5/i\_made\_a\_realistic\_water\_shader\_with\_webgputsl/](https://www.reddit.com/r/threejs/comments/1pf93l5/i_made_a_realistic_water_shader_with_webgputsl/)  
* Chromatic Aberration and Post Processing Tool | Touchdesigner Tutorial \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=VbSiesNF9Jc](https://www.youtube.com/watch?v=VbSiesNF9Jc)  
* Webgpu Raytracer \- Three.js Resources, acessado em fevereiro 2, 2026, [https://threejsresources.com/tool/webgpu-raytracer](https://threejsresources.com/tool/webgpu-raytracer)  
* react-smokey-fluid-cursor CDN by jsDelivr \- A CDN for npm and GitHub, acessado em fevereiro 2, 2026, [https://www.jsdelivr.com/package/npm/react-smokey-fluid-cursor](https://www.jsdelivr.com/package/npm/react-smokey-fluid-cursor)  
* React Three Fiber Tutorial \- Rapier Physics Engine \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=OpYtwrtpePY](https://www.youtube.com/watch?v=OpYtwrtpePY)

# **The Surreal Interface: A Comprehensive Technical Manifesto on the State of Award-Winning Motion Design (2025-2026)**

## **Executive Summary: The Rise of Agentic Realism and The Liquid Web**

The digital interface is currently undergoing its most significant paradigm shift since the advent of responsive design. As we traverse through 2025 into 2026, the criteria for "Award-Winning" recognition—accolades such as the Awwwards Site of the Day, FWA Site of the Month, and CSS Design Awards—have fundamentally evolved. We have moved beyond the era of static grid systems and "delight" animations into an era defined by **Agentic Realism**, **Liquid Interfaces**, and **Surreal Physics**. The modern web experience is no longer viewed as a digital brochure; it is engineered as a simulated environment that possesses mass, viscosity, optical properties, and behavioral intelligence.1

This report provides an exhaustive, expert-level analysis of the motion concepts defining this new epoch. It dissects the transition from utilitarian UI to "Surreal" UX, where interfaces behave like living organisms—breathing, reacting to cursor proximity with fluid dynamics, and transitioning with cinematic continuity that mimics the properties of matter.3 The analysis is grounded in the technical realities of the current stack: the dominance of **GSAP** for timeline management, **Lenis** for scroll virtualization, **React Three Fiber (R3F)** for declarative WebGL, and custom **GLSL Shaders** for atmospheric distortion.

We are witnessing the "Anti-Grid" movement 3, where the rigid Cartesian coordinates of the DOM are subverted by physics engines like **Matter.js** and **Verlet Integration**. Typography is no longer read; it is collided with. Images are not viewed; they are distorted by the velocity of the user's input. The "Liquid Glass" aesthetic, codified by Apple’s mid-2025 design language shifts 4, has normalized real-time refraction and reflection in the browser, demanding a mastery of **Raymarching** and **Signed Distance Fields (SDFs)** previously reserved for high-end gaming.5

This document serves as a technical manual and strategic roadmap for Creative Developers and Lead Motion Designers. It explores the physics of scroll, the hydrodynamics of cursor interactions, the structural engineering of kinetic typography, and the atmospheric rendering of surreal environments. Each section deconstructs the underlying mathematics, the implementation strategies, and the aesthetic implications of these cutting-edge behaviors.

## ---

**1\. The Physics of Scroll: Engineering Weight and Temporal Distortion**

The scroll interaction remains the primary method of spatial traversal on the web, yet the "default" browser scroll is increasingly viewed as a raw material—coarse, linear, and devoid of character. In the realm of high-end, award-winning experiences, the scroll is treated as a physical force that drives time and deformation. The objective is to impart a sense of *weight* and *luxury* to the viewport, transforming content consumption into a tactile journey through a viscous medium.

### **1.1 Virtualizing the Scroll: The Hegemony of Lenis**

By late 2024 and throughout 2025, the debate between "Native Scroll" and "Scroll Hijacking" was largely resolved by the emergence of **Lenis** (created by Studio Freight/Darkroom Engineering) as the industry standard.6 Unlike previous generations of smooth scroll libraries (such as Locomotive Scroll v4) which completely hijacked the scroll interaction by transforming a fixed-height container, Lenis adopted a "Hybrid" architecture. It virtualizes the scroll *events* while maintaining the native scroll *dimensions*.

#### **1.1.1 The Mathematics of Damping and Lerp**

The defining characteristic of a premium scroll experience is the separation of user input from visual response. This lag creates the sensation of mass. The core mathematical principle employed is **Linear Interpolation (Lerp)**.

The rendering loop, typically synchronized with requestAnimationFrame to ensure 60fps or 120fps performance, calculates the visual position (![][image39]) based on the target position (![][image40]) set by the input event (wheel or touch):

![][image41]  
Here, ![][image42] represents the damping factor or interpolation coefficient.

* **The "Heavy" Standard:** A value of 0.05 to 0.08 is standard for "Site of the Day" winners. This low value creates a significant drift, where the page continues to glide for seconds after the user releases the input device, mimicking the momentum of a heavy physical object sliding on ice.6  
* **The Accessibility Bridge:** Because Lenis simply interpolates the window.scrollTo or transforms a wrapper while keeping the document height intact, it preserves critical accessibility features like CMD+F (Find in Page) and keyboard navigation (Tab indexing), which were notoriously broken in previous eras of "smooth scrolling".8

#### **1.1.2 Syncing the Render Loop**

A critical technical nuance in 2025 is the synchronization of the scroll loop with the WebGL render loop. Discrepancies between the DOM scroll (handled by the main thread) and the WebGL canvas (often handled by a separate context or heavy GPU workload) result in "Jitter" or "Desync," destroying the immersion. Lenis exposes a raf method that allows developers to drive the scroll update explicitly within the global application tick, ensuring that HTML DOM elements and WebGL meshes move in perfect lockstep.6

### **1.2 Velocity-Based Deformation: The "Jelly" Effect**

To visually reinforce the physics of the scroll, static assets must react to the *velocity* of the movement. This is known as **Velocity Skew** or **Elastic Deformation**, a technique that creates a "surreal" fluidity where solid objects appear flexible when in motion.

#### **1.2.1 Calculating the Delta**

The physics engine must calculate the instantaneous velocity, derived as the Delta (![][image43]) between frames:

![][image44]  
This ![][image45] is not merely a number; it is a force vector applied to the interface.

#### **1.2.2 CSS Skew vs. WebGL Vertex Distortion**

There are two distinct tiers of implementation for this effect:

**Tier 1: CSS Transformation (The Skew)**

The most performant DOM-based approach involves applying a CSS skew transform based on the velocity.

![][image46]  
Where ![][image47] is a constant multiplier (e.g., 0.1). As the user scrolls down, the content skews positively; as they scroll up, it skews negatively. This mimics the effect of drag or air resistance acting on the top and bottom edges of the element differently.9

**Tier 2: WebGL Vertex Displacement (The Liquid Stretch)**

For "Surreal" interfaces, simple skewing is insufficient. Developers utilize WebGL Vertex Shaders to bend the geometry itself. The velocity is passed as a uniform (uVelocity) to the shader.

Inside the vertex shader, the geometry is deformed along a curve, typically a sine wave or a parabolic arc parameterized by the Y-coordinate of the vertex.

* **The Effect:** The center of the image trails behind the edges, or the entire image stretches like gelatin. This "Jelly" effect implies that the content is soft and malleable, contributing to the "Organic" design trend.3  
* **The Math:** ![][image48]. This bends the plane in 3D space, creating a bulge that feels incredibly tactile.

### **1.3 Infinite Geometries and The Anti-Grid**

The vertical linearity of the web is being dismantled by "Infinite Scroll" architectures that loop content seamlessly, creating the illusion of an endless dataset. This is particularly prevalent in portfolio sites and fashion editorials.11

#### **1.3.1 The Modulo Operator and Virtual Positioning**

True infinite scroll does not involve cloning infinite DOM elements. It relies on the **Modulo Operator (%)** and virtual positioning.

As the scroll value increases indefinitely (![][image49]), the visual position of an item is calculated as:

![][image50]  
When an item scrolls off the top of the viewport, the modulo logic instantaneously snaps it to the bottom of the stack. Because this happens exactly at the boundary of the visible area (or slightly outside it), the user perceives a continuous, unbroken loop.

#### **1.3.2 3D Carousels and Reactive Lighting**

In the WebGL space, this looping logic is applied to 3D carousels (Cylinders or Spheres). Items are arranged in a circle. As the user scrolls, the entire group rotates.

* **Reactive Gradients:** A key trend in 2025 is **Reactive Lighting**. The scroll position determines not just the rotation, but the lighting of the scene. As an item moves into the "active" center spot, it is illuminated, or a background gradient shifts to match its dominant colors. This utilizes a proximity check in the fragment shader:  
  ![][image51]  
  This creates a "Spotlight" effect that guides the user's focus naturally, a technique seen in high-end demos on Codrops and Awwwards.11

### **1.4 Scrollytelling: The Narrative Scrub**

"Scrollytelling" has evolved from simple text fade-ins to complex, timeline-scrubbed narratives. The scrollbar becomes a playback head for a cinematic experience.

#### **1.4.1 Pinning and Sub-Pixel Scrubbing**

Using **GSAP ScrollTrigger**, developers "pin" a container (holding a 3D model or video) to the viewport. The scroll distance (e.g., 3000px) is then mapped to the timeline of an animation.13

* **The "Exploded View":** A popular surreal trope is the deconstruction of an object. As the user scrolls, a 3D product (like a sneaker or a camera) separates into its component parts. This is not a video; it is a real-time 3D scene where the position and rotation of every screw and panel are bound to the scroll progress.  
* **Interpolation Strategy:** To prevent the animation from feeling "steppy," the scroll progress is interpolated (using the same Lerp logic as Lenis). This ensures that even if the user scrolls one "notch" on their wheel, the animation glides smoothly to the new frame rather than jumping.

#### **1.4.2 Camera Path Navigation**

In fully immersive 3D sites, the scroll drives the camera along a **Catmull-Rom Spline** or a **Bezier Curve**. The website is a 3D world, and the user is on a rail.

* **Implementation:** The scroll percentage (![][image52]) is passed to the curve function curve.getPointAt(t). The camera's position is updated to this point, and its lookAt vector is updated to a slightly further point on the curve (t \+ 0.01), ensuring it always faces forward. This allows for dynamic, cinematic angles—swooping down from a bird's eye view to a macro close-up—controlled entirely by the user's pace.15

## ---

**2\. The Agentic Cursor: Hydrodynamics and Micro-Interactions**

In the "Agentic Web" of 2026, the cursor is no longer a passive pointer; it is an active emitter of force and energy. It interacts with the "digital matter" of the interface, leaving trails, distorting images, and magnetically attracting UI elements. This category of interaction relies heavily on **Fluid Dynamics** simulations and **GPGPU** (General-Purpose computing on Graphics Processing Units).3

### **2.1 Navier-Stokes and The Fluid Simulation Standard**

The gold standard for "surreal" cursor trails—resembling smoke, ink, or liquid—is a real-time solution of the **Navier-Stokes equations** for fluid dynamics. This is a computationally intensive process that is impossible to run on the CPU; it must be executed in the fragment shader.17

#### **2.1.1 The Simulation Loop: Advection, Diffusion, Pressure**

The simulation utilizes a "Ping-Pong" technique with **Frame Buffer Objects (FBOs)**. Two textures are maintained for every property (Velocity, Density, Pressure), and the simulation swaps between reading from one and writing to the other in every frame.

**The Four Critical Passes:**

* **Advection (Transport):** This is the core movement logic. The shader asks, "For the pixel at coordinate ![][image53], where was the fluid that is here now in the *previous* frame?" It looks backward along the velocity vector:  
  ![][image54]  
  It samples the density (color) at that old position and moves it to the new one. This creates the swirling motion.  
* **External Forces (The Splat):** The cursor is the input. In this pass, the code injects values into the Velocity and Density textures based on the mouse's movement delta (![][image55]). The radius of this injection is often randomized to create organic variation (the "Splat Radius").19  
* **Viscosity and Diffusion:** The fluid spreads out. Each pixel exchanges a small amount of its value with its neighbors, blurring the result. This creates the "thick" feeling of the fluid.  
* **Divergence and Pressure:** To make the fluid look realistic (incompressible), the simulation must ensure that fluid doesn't just disappear or stack up infinitely. It calculates the Divergence (how much fluid is flowing *out* of a cell) and runs a **Jacobi Iteration** solver to calculate Pressure, which pushes the fluid back to equilibrium.

#### **2.1.2 Integration: The Distortion Map**

While rendering the fluid as colored smoke is common, the "Award-Winning" technique is to use this fluid simulation as a **Displacement Map** for the underlying content. The text and images on the website ripple, warp, and liquefy as the invisible fluid flows over them. This connects the user's gesture directly to the structural integrity of the interface.5

### **2.2 GPGPU Trails and The Relaxation Technique**

For scenarios where a full Navier-Stokes simulation is too heavy (e.g., mobile devices), the **GPGPU Relaxation** method is the preferred alternative. It creates smooth, fading trails that can drive grid displacements.20

#### **2.2.1 Data Persistence in Textures**

Standard shaders have no memory; they redraw the world every frame from scratch. To create a trail, we need memory. We use an FBO to store the "Trail Texture."

* **The Logic:** In every frame, the shader takes the *previous frame's* texture and multiplies the color of every pixel by a "Relaxation Factor" (e.g., 0.96).  
  ![][image56]  
  Simultaneously, it draws a new circle at the current mouse position.  
* **The Result:** The new circle is bright (1.0). The circle from the previous frame is slightly dimmer (0.96). The circle from 20 frames ago is very dim (![][image57]). This creates a smooth, tapering trail that fades to black naturally.

#### **2.2.2 Grid Displacement Application**

This trail texture is then mapped to the vertex shader of a 3D plane. The brightness of the pixel determines the Z-height of the vertex.

![][image58]  
This creates a "Mountain" or "Ripple" in the mesh that follows the mouse. As the trail fades (relaxes), the mountain sinks back into the flat plane. This is widely used for "Liquid Surface" backgrounds where the grid lines distort organically.20

### **2.3 Inverse Blending and Exclusion Cursors**

A staple of the "Brutalist" and "Surreal" aesthetic is the cursor that inverts the content beneath it. This ensures high contrast and visibility regardless of the background color.21

#### **2.3.1 The WebGL Scene Capture Method**

While CSS mix-blend-mode: difference is the basic implementation, it fails in complex stacking contexts (e.g., over sticky headers or 3D canvases). The pro-level solution involves **WebGL Scene Capture**.

* **Render to Texture:** The entire WebGL scene is rendered to an off-screen texture (FBO) instead of the screen.  
* **Post-Processing Composition:** A final shader draws this texture to the screen. It also tracks the mouse position.  
* **The Math:** Inside a circular radius around the mouse, the shader inverts the color.  
  ![][image59]  
  This allows for advanced effects, such as a cursor that acts as an "X-Ray," revealing a completely different texture (e.g., a wireframe view) inside the circle, rather than just inverting the colors.22

### **2.4 Magnetic Buttons and Spring Physics**

The "Magnetic" button effect—where a UI element snaps to the cursor and follows it within a constrained radius—is a critical micro-interaction for imparting a "tactile" feel.

#### **2.4.1 Hooke’s Law Implementation**

This behavior is modeled using **Hooke’s Law** for springs. It is *not* a CSS transition; it is a physics simulation running in a JavaScript loop.24 The force ![][image60] exerted on the button is proportional to its distance from the origin (the button's resting place) and the mouse (the attractor).

![][image61]  
Where ![][image47] is the spring stiffness (tension) and ![][image62] is the damping (friction).

* **The "Stickiness":** The simulation runs constantly. When the mouse enters the trigger area, the "Target" shifts from the origin ![][image63] to the mouse position. The button accelerates towards the mouse.  
* **The Release:** When the mouse leaves, the "Target" snaps back to ![][image63]. The button overshoots the center and oscillates slightly before settling, creating a "jelly-like" organic recovery.25

## ---

**3\. Kinetic Typography: Text as Physical Matter**

Typography in 2026 has transcended its role as a static semantic layer. In the Surreal Web, text is treated as a physical object with mass, collision boundaries, and material properties. It is not just read; it is interacted with, scattered, and deformed.

### **3.1 The Rigid Body: Matter.js and The Anti-Grid**

The "Imperfect by Design" trend 27 favors chaos and randomness over pixel-perfect alignment. Physics engines allow typography to tumble, stack, and collide in unscripted ways.

#### **3.1.1 Matter.js Integration**

**Matter.js** is the industry-standard 2D rigid body physics engine used for these effects.28

* **The Architecture:** The system runs an invisible physics simulation in the background. Each letter is represented by a rigid body (a rectangle or a polygon). The visual representation (DOM element or Canvas draw call) is synchronized to the physics body's position (![][image64]) and rotation (![][image65]) in every frame.  
* **Convex Hulls:** For high-fidelity interactions, simple bounding boxes are insufficient (an "A" is not a rectangle). Developers use **Poly-Decomp** algorithms to generate a "Convex Hull"—a polygon that tightly wraps the glyph's shape. This ensures that when an "A" falls onto an "O", it slides off the curvature realistically rather than sitting on a floating invisible box.

#### **3.1.2 Interaction Models**

* **Gravity Inversion:** A popular surreal mechanic involves binding gravity to the scroll direction. Scrolling down increases gravity (![][image66]); scrolling up inverts it (![][image67]), causing the text to float upward like bubbles.  
* **Repulsion Fields:** The cursor acts as a "Repulsor." As it moves through a paragraph, it applies a force vector inversely proportional to the distance, scattering the letters. They then slowly "seek" their original positions using a spring force, reforming the sentence organically.

### **3.2 The Soft Body: Text as Cloth (Verlet Integration)**

For a softer, more organic aesthetic, text is simulated as if it were printed on a piece of silk, a flag, or a rope. This utilizes **Verlet Integration**, a method preferred over Euler integration for its stability in constrained systems (like connected joints).30

#### **3.2.1 The Mathematics of Verlet**

Verlet integration does not track velocity explicitly. It calculates the next position based on the current and previous positions.

![][image68]  
This implicit velocity makes it incredibly stable for simulating "Constraints" (the "sticks" between "particles").

#### **3.2.2 The "String" Navigation Trend**

A dominant trend is "Rope Navigation," where menu items are connected by simulated strings.

* **Implementation:** A series of particles are connected by distance constraints. The first particle is pinned to the mouse (or grid). The subsequent particles drag behind, creating a "snake" or "whip" motion.  
* **Rendering:** A spline curve is drawn through the particle positions. The text is rendered along this path using \<textPath\> (SVG) or mesh deformation (WebGL). This adds a playful, fluid quality to navigation, making the UI feel like a physical toy.32

### **3.3 3D Typography and Liquid Glass (React Three Fiber)**

The "Liquid Glass" trend 4 finds its ultimate expression in 3D typography. This is the domain of **React Three Fiber (R3F)**, which allows for declarative construction of complex WebGL scenes.33

#### **3.3.1 Geometry Extrusion and Transmission**

Standard font files are converted to JSON and extruded into 3D geometry (TextGeometry). The "Award-Winning" look relies on the **MeshTransmissionMaterial** (from the @react-three/drei ecosystem).

* **Refraction and IOR:** This material simulates the physics of light passing through a dielectric medium (glass, crystal, water). It captures the scene *behind* the text and renders it on the surface, distorted by the object's thickness and Index of Refraction (IOR).  
  * *Water:* IOR 1.33  
  * *Glass:* IOR 1.50  
  * *Diamond:* IOR 2.42  
* **Chromatic Aberration:** High-end implementations enable chromatic aberration, splitting the refracted light into its RGB components at the edges of the letters. This "Prism" effect is a hallmark of the futuristic aesthetic.4

#### **3.3.2 Soft Body 3D (The Inflatable Type)**

Pushing the boundaries further, developers use 3D soft-body physics (via libraries like use-cannon) to make the text "squishy."

* **Pressure Physics:** The text mesh is treated as a pressurized volume (a balloon).  
* **Interaction:** On hover, the internal pressure is increased (![][image69]), causing the letters to puff up. On click, they might deflate or wobble. This "Agentic" behavior makes the typography feel biologically alive, responding to touch with structural changes.35

## ---

**4\. Spatial Transitions: The Fluid Architecture**

In the surreal web, the "hard cut" is obsolete. Navigation is a continuous morphing of geometry. The page does not unload; it transforms.

### **4.1 The FLIP Technique (First, Last, Invert, Play)**

The **FLIP** principle is the architectural foundation for "Shared Element Transitions," where an item (e.g., a thumbnail) expands to become the hero of the next screen.36

#### **4.1.1 The FLIP Lifecycle**

Transitioning an element from one DOM state (e.g., inside a grid) to another (e.g., fixed fullscreen) is historically janky because it triggers layout thrashing. FLIP solves this by using transforms to fake the motion.

* **First:** Measure the element's position (getBoundingClientRect) in the initial state.  
* **Last:** Change the DOM state (remove grid class, add hero class). Let the browser calculate the new layout. Measure the new position.  
* **Invert:** Calculate the transform required to move the element from the *Last* position back to the *First* position.  
  ![][image70]  
  ![][image71]  
  Apply this transform immediately. To the user, the element appears to haven't moved yet.  
* **Play:** Animate the transform to zero (translate(0,0) scale(1)). The element glides smoothly to its new home.

#### **4.1.2 GSAP Flip Plugin**

The **GSAP Flip Plugin** is the industry standard for this. It handles the complex math of **Scale Compensation** (ensuring that children of the expanding element, like text, do not distort) and **Nested Transforms**. It is essential for the "App-like" continuity seen in SOTD winners.38

### **4.2 WebGL Distortion Transitions**

For transitions between images or scenes, **WebGL Distortion** replaces the cross-fade.

#### **4.2.1 The Displacement Map Technique**

A transition shader uses a grayscale texture (Displacement Map) to drive the mixing of two images.

* **The Logic:** As the transition progress goes from 0 to 1, the UV coordinates of the current image are pushed in one direction, and the UVs of the next image are pushed from the opposite direction.  
* **Fluid Masking:** A common surreal technique is to use the user's *cursor trail* (from Section 2.2) as the mask. The user "wipes" away the current page to reveal the next one, giving them agency over the transition speed and shape.39

#### **4.2.2 Glitch and Datamoshing**

Another prevalent style is the **Glitch Transition**. This involves displacing horizontal slices of the image with random offsets and separating the RGB channels (RGB Split) during the transition. This simulates a digital signal failure, aligning with the "Cyberpunk" and "Brutalist" aesthetics.20

## ---

**5\. Atmospheric Rendering: Raymarching and The "Liquid" Aesthetic**

The final layer that defines the "Surreal" web is Atmosphere. It is the lighting, the texture, and the seamless blending of forms. This is achieved through **Raymarching**, a rendering technique that bypasses standard polygonal meshes in favor of pure mathematics.

### **5.1 Raymarching and Signed Distance Fields (SDFs)**

Standard 3D rendering (Rasterization) draws triangles. Raymarching, used in **Three.js Shading Language (TSL)**, draws mathematical functions.5

#### **5.1.1 The Concept of SDFs**

A **Signed Distance Field (SDF)** is a function that returns the distance from any point in space (![][image72]) to the surface of a shape.

* *Sphere:* ![][image73].  
  * Negative: Inside the sphere.  
  * Positive: Outside.  
  * Zero: On the surface.

#### **5.1.2 The Smooth Minimum (Metaballs)**

The "Liquid Metal" effect—where shapes bloop together like mercury—is impossible with standard meshes. In Raymarching, it is trivial using the **Smooth Minimum (smin)** function.

Instead of min(a, b) (which creates a sharp crease), smin blends the distance fields:

![][image74]  
![][image75]  
This function creates a curved bridge between objects when they get close, creating the "Gloop" effect seen in Vention's branding and Apple's Liquid Glass concepts.5

### **5.2 Post-Processing and The "Film" Look**

To ground these surreal visuals in reality, a layer of "imperfection" is added via post-processing shaders.

* **Grain:** High-frequency noise is overlayed to simulate film grain. This serves a dual purpose: it adds aesthetic texture and creates "dithering" to prevent color banding in smooth gradients.  
* **Bloom:** This simulates the bleeding of light from bright areas into dark areas. It is essential for "Neon" aesthetics. It renders the scene to a lower resolution, blurs it, and adds it back to the original image.  
* **Chromatic Aberration:** Simulating lens imperfection by offsetting the Red, Green, and Blue channels radially. In 2026, this is dynamic—linked to the scroll velocity or mouse speed. The faster the user moves, the more the "lens" distorts, visually communicating speed and intensity.20

## ---

**6\. Future Outlook: The Generative and Agentic Web (2026)**

As we look toward the remainder of 2026, the convergence of these technologies points to a singular trend: **The Agentic Web**.

The interface is becoming a participant. With the integration of AI-driven logic, the physics parameters discussed above (damping, stiffness, fluid viscosity) will no longer be static constants. They will be dynamic variables adjusted in real-time by AI agents that analyze the user's intent.

* **Generative UI:** Interfaces where the layout itself (the "Grid") is generated procedurally based on the content, using FLIP to transition seamlessly between states.  
* **Behavioral Physics:** A website that "feels" heavier if the content is serious, or "lighter" and more bouncy if the content is playful, adjusted automatically.

The "Award-Winning" web experience of the future is a living simulation. It is a synthesis of high-performance engineering (Lenis, WebGL) and artistic intuition (Fluidity, Surrealism). It rejects the static in favor of the kinetic, and the perfect in favor of the organic.

### **Comparative Technology Matrix**

| Concept | Primary Technology | Key Mathematical Principle | Aesthetic Outcome |
| :---- | :---- | :---- | :---- |
| **Virtual Scroll** | **Lenis** | Linear Interpolation (Lerp) | Weight, Momentum, "Luxury" feel |
| **Fluid Cursor** | **WebGL (OGL/Three)** | Navier-Stokes (Advection) | Smoke, Liquid, Distortion |
| **Physics Type** | **Matter.js** | Rigid Body Dynamics | Chaos, Collisions, Anti-Grid |
| **Rope Type** | **Verlet.js** | Verlet Integration | Cloth, String, Organic movement |
| **Transitions** | **GSAP Flip** | FLIP (First, Last, Invert, Play) | App-like continuity, Morphing |
| **Liquid 3D** | **R3F / TSL** | Raymarching (SDF \+ smin) | Metaballs, Mercury, Blending |
| **Refraction** | **Custom Shaders** | Snell's Law (IOR) | Glass, Ice, Diamond, Prism |

This concludes the comprehensive analysis of the surreal interface.

#### **Referências citadas**

* State of AI 2025 \- Awwwards Honorable Mention, acessado em fevereiro 2, 2026, [https://www.awwwards.com/sites/state-of-ai-2025](https://www.awwwards.com/sites/state-of-ai-2025)  
* Creative Giants \- Awwwards SOTD, acessado em fevereiro 2, 2026, [https://www.awwwards.com/sites/creative-giants](https://www.awwwards.com/sites/creative-giants)  
* Web Design Trends to Expect in 2026 \- Elementor, acessado em fevereiro 2, 2026, [https://elementor.com/blog/web-design-trends-2026/](https://elementor.com/blog/web-design-trends-2026/)  
* Apple introduces a delightful and elegant new software design, acessado em fevereiro 2, 2026, [https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)  
* How to Create a Liquid Raymarching Scene Using Three.js Shading ..., acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2024/07/15/how-to-create-a-liquid-raymarching-scene-using-three-js-shading-language/](https://tympanus.net/codrops/2024/07/15/how-to-create-a-liquid-raymarching-scene-using-three-js-shading-language/)  
* Lenis Smooth Scroll: Step-by-Step Integration Guide in Webflow \- Digidop, acessado em fevereiro 2, 2026, [https://www.digidop.com/blog/lenis-smooth-scroll](https://www.digidop.com/blog/lenis-smooth-scroll)  
* darkroomengineering/lenis: Smooth scroll at it should be \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/darkroomengineering/lenis](https://github.com/darkroomengineering/lenis)  
* Use ScrollSmoother features with lenis scroll \- GSAP, acessado em fevereiro 2, 2026, [https://gsap.com/community/forums/topic/36030-use-scrollsmoother-features-with-lenis-scroll/](https://gsap.com/community/forums/topic/36030-use-scrollsmoother-features-with-lenis-scroll/)  
* This scroll animation feels alive (Motion \+ Lenis) \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=a5yDuft0s60](https://www.youtube.com/watch?v=a5yDuft0s60)  
* Design trends for 2026 \- Adobe, acessado em fevereiro 2, 2026, [https://www.adobe.com/express/learn/blog/graphic-design-trends-2026](https://www.adobe.com/express/learn/blog/graphic-design-trends-2026)  
* Tutorials \- Codrops, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/category/tutorials/](https://tympanus.net/codrops/category/tutorials/)  
* 3D | Codrops, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/tag/3d/](https://tympanus.net/codrops/tag/3d/)  
* 2025: A Very Special Year in Review | Codrops, acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/](https://tympanus.net/codrops/2025/12/29/2025-a-very-special-year-in-review/)  
* Portfolio 2025 \- Awwwards Honorable Mention, acessado em fevereiro 2, 2026, [https://www.awwwards.com/sites/portfolio-2025](https://www.awwwards.com/sites/portfolio-2025)  
* Mid-Year Digital Trends Report \- Awwwards SOTD, acessado em fevereiro 2, 2026, [https://www.awwwards.com/sites/mid-year-digital-trends-report](https://www.awwwards.com/sites/mid-year-digital-trends-report)  
* Modern UI Design Trends For Websites In 2025 \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=22xSX136JCQ](https://www.youtube.com/watch?v=22xSX136JCQ)  
* faraasat/smokey-fluid-cursor \- GitHub, acessado em fevereiro 2, 2026, [https://github.com/faraasat/smokey-fluid-cursor](https://github.com/faraasat/smokey-fluid-cursor)  
* Fluid Simulation (with WebGL demo) \- Jamie Wong, acessado em fevereiro 2, 2026, [https://jamie-wong.com/2016/08/05/webgl-fluid-simulation/](https://jamie-wong.com/2016/08/05/webgl-fluid-simulation/)  
* Explaining fluid-simulation-react | by Kathan Chaudhari | Medium, acessado em fevereiro 2, 2026, [https://medium.com/@kiyo07/explaining-fluid-simulation-react-4ad0d607747e](https://medium.com/@kiyo07/explaining-fluid-simulation-react-4ad0d607747e)  
* Grid Displacement Texture with RGB Shift using Three.js GPGPU ..., acessado em fevereiro 2, 2026, [https://tympanus.net/codrops/2024/08/27/grid-displacement-texture-with-rgb-shift-using-three-js-gpgpu-and-shaders/](https://tympanus.net/codrops/2024/08/27/grid-displacement-texture-with-rgb-shift-using-three-js-gpgpu-and-shaders/)  
* How do I invert text color inside hovering custom mouse cursor? : r/webdev \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/webdev/comments/1as3qtb/how\_do\_i\_invert\_text\_color\_inside\_hovering\_custom/](https://www.reddit.com/r/webdev/comments/1as3qtb/how_do_i_invert_text_color_inside_hovering_custom/)  
* WebGL drawing 2d objects with different blending modes \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/18560462/webgl-drawing-2d-objects-with-different-blending-modes](https://stackoverflow.com/questions/18560462/webgl-drawing-2d-objects-with-different-blending-modes)  
* Difference blend mode, or something similar \- OpenGL: Basic Coding \- Khronos Forums, acessado em fevereiro 2, 2026, [https://community.khronos.org/t/difference-blend-mode-or-something-similar/107959](https://community.khronos.org/t/difference-blend-mode-or-something-similar/107959)  
* Mass and Spring in Gravity HTML5 JavaScript Simulation by Darren Z Tan, acessado em fevereiro 2, 2026, [https://sg.iwant2study.org/ospsg/index.php/1017](https://sg.iwant2study.org/ospsg/index.php/1017)  
* How to Create Physics-Based Spring Animations with Custom Damping in JavaScript, acessado em fevereiro 2, 2026, [https://dev.to/hexshift/how-to-create-physics-based-spring-animations-with-custom-damping-in-javascript-1e08](https://dev.to/hexshift/how-to-create-physics-based-spring-animations-with-custom-damping-in-javascript-1e08)  
* A Friendly Introduction to Spring Physics Animation in JavaScript \- Josh Comeau, acessado em fevereiro 2, 2026, [https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/)  
* 'Imperfect by Design': The visual design trends set to define 2026 \- Canva, acessado em fevereiro 2, 2026, [https://www.canva.com/newsroom/news/design-trends-2026/](https://www.canva.com/newsroom/news/design-trends-2026/)  
* TE Lecture 8.2.2 (matter.js text) \- p5.js Web Editor, acessado em fevereiro 2, 2026, [https://editor.p5js.org/stojanlj/sketches/e6HKxYTLc](https://editor.p5js.org/stojanlj/sketches/e6HKxYTLc)  
* Throwing around text \- Kinetic typography part 2: Tricking gravity thanks to matter.js\!, acessado em fevereiro 2, 2026, [https://dev.to/thormeier/throwing-around-text-kinetic-typography-part-2-it-defies-gravity-itself-thanks-to-matterjs-239e](https://dev.to/thormeier/throwing-around-text-kinetic-typography-part-2-it-defies-gravity-itself-thanks-to-matterjs-239e)  
* Cloth Simulation in TypeScript | Yaniv Leviathan, acessado em fevereiro 2, 2026, [https://yanivle.github.io/graphics/2018/11/13/cloth-simulation-in-typescript.html](https://yanivle.github.io/graphics/2018/11/13/cloth-simulation-in-typescript.html)  
* Verlet Integration and Cloth Physics Simulation \- Pikuma, acessado em fevereiro 2, 2026, [https://pikuma.com/blog/verlet-integration-2d-cloth-physics-simulation](https://pikuma.com/blog/verlet-integration-2d-cloth-physics-simulation)  
* I made a tutorial on how to do cloth simulation and Verlet Integration \- Reddit, acessado em fevereiro 2, 2026, [https://www.reddit.com/r/programming/comments/fg0k7/i\_made\_a\_tutorial\_on\_how\_to\_do\_cloth\_simulation/](https://www.reddit.com/r/programming/comments/fg0k7/i_made_a_tutorial_on_how_to_do_cloth_simulation/)  
* react-three/fiber creating 3D text \- Stack Overflow, acessado em fevereiro 2, 2026, [https://stackoverflow.com/questions/71105484/react-three-fiber-creating-3d-text](https://stackoverflow.com/questions/71105484/react-three-fiber-creating-3d-text)  
* How to Create 3D Text in React Three Fiber | by Zach Mommaerts | Medium, acessado em fevereiro 2, 2026, [https://medium.com/@zmommaerts/how-to-create-3d-text-in-react-three-fiber-a35376456a04](https://medium.com/@zmommaerts/how-to-create-3d-text-in-react-three-fiber-a35376456a04)  
* Soft body physics in 3D on three.js. \- Showcase, acessado em fevereiro 2, 2026, [https://discourse.threejs.org/t/soft-body-physics-in-3d-on-three-js/84116](https://discourse.threejs.org/t/soft-body-physics-in-3d-on-three-js/84116)  
* Flip | GSAP | Docs & Learning, acessado em fevereiro 2, 2026, [https://gsap.com/docs/v3/Plugins/Flip/](https://gsap.com/docs/v3/Plugins/Flip/)  
* GSAP Flip Tutorial \- 1- (Getting Started) \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=wKiHaQO8X24](https://www.youtube.com/watch?v=wKiHaQO8X24)  
* Animating with the Flip Plugin for GSAP, acessado em fevereiro 2, 2026, [https://ryanmulligan.dev/blog/gsap-flip-cart/](https://ryanmulligan.dev/blog/gsap-flip-cart/)  
* Discover 2025's top web design trends curated by Muzli, acessado em fevereiro 2, 2026, [https://muz.li/blog/discover-2025s-top-web-design-trends-curated-by-muzli/](https://muz.li/blog/discover-2025s-top-web-design-trends-curated-by-muzli/)  
* Glitch Transition Tutorial in After Effects | RGB Glitch Effect | No Plugins \- YouTube, acessado em fevereiro 2, 2026, [https://www.youtube.com/watch?v=gt85MKS3Ito](https://www.youtube.com/watch?v=gt85MKS3Ito)  
* ray marching (with THREE.js), acessado em fevereiro 2, 2026, [https://barradeau.com/blog/?p=575](https://barradeau.com/blog/?p=575)

# Futuristic & Surreal High-Tech Web Features (2026 Edition)

In the cutting-edge web of 2026, developers and designers are crafting experiences that feel more like interactive art and sci-fi interfaces than traditional websites. Below is an **exhaustive list** of the most futuristic, surreal, and high-tech web features currently possible or in use, organized into five categories. Each feature is described with a visionary yet technically grounded tone, and paired with the tools or tech stack that can make it a reality.

## 1\. IMMERSIVE VISUALS & RENDERING (The "Eye Candy")

* **Chromatic Aberration & Shader Distortion on Scroll:** Using custom GLSL fragment shaders (via WebGL/Three.js) to warp page elements and split colors for a trippy lens effect that intensifies as you scroll[\[1\]](https://www.reddit.com/r/threejs/comments/171ly1x/any_ideas_on_how_to_achieve_this_effect/#:~:text=shaders%20and%20deep%20familiarity%20with,a%20nice%20intro%20into%20shading). For example, images can *visibly refract and bleed RGB channels* when the user scrolls quickly, creating a camera-like **chromatic aberration** effect. This is achieved with a Three.js **ShaderMaterial** tied to the scroll position, or even out-of-the-box with materials like Three’s MeshTransmissionMaterial which simulates dispersion[\[2\]](https://www.reddit.com/r/threejs/comments/171ly1x/any_ideas_on_how_to_achieve_this_effect/#:~:text=i%20have%20a%20shader%20that,ShaderMaterial). **Tools:** Three.js (with custom shaders), libraries like **Curtains.js** or **OGL** for simpler shader planes, and shader examples from **ShaderToy** can jump-start these effects.

* **“Liquid Metal” WebGL Distortions:** Surreal fluid-like surfaces that morph and reflect like mercury, used as backgrounds or hover effects. These are created by feeding dynamic **displacement maps** or noise textures into shaders. On hover or scroll, content appears to ripple and melt as if made of chrome. A popular approach is using the lightweight **OGL** library with a fragment shader for a smooth liquid distortion effect[\[3\]](https://www.youtube.com/watch?v=LPzx_QnqC68#:~:text=Of%20www,shaders%20with%20the%20OGL%20library). CodePen snippets (e.g. by Darryl Huffman) demonstrate how to implement a **liquid metal background** with just a few shader passes[\[4\]](https://medium.com/@ace_studio/how-to-add-a-liquid-metal-webgl-effect-as-a-background-8fcc42730783#:~:text=WebGL%20allows%20developers%20to%20create,thank%20you%20Darryl). **Tools:** WebGL with **fragment shaders**, Three.js or OGL, or even high-level solutions like a Framer component that turns logos into flowing liquid chrome[\[5\]](https://www.framer.com/marketplace/components/liquid-metal-logo/#:~:text=Liquid%20Metal%20Logo%3A%20Free%20UI,animation%20with%20realistic%20metallic).

* **Volumetric Fog & Participating Media:** Realistic fog, smoke, and god-ray effects that users can *interact* with. This involves ray-marching or volumetric textures in WebGL to simulate light scattering. For instance, a hero section might have **volumetric light rays** shining through mist that react to the cursor position (occluding and shifting perspective)[\[6\]](https://tympanus.net/codrops/2022/06/27/volumetric-light-rays-with-three-js/#:~:text=A%20coding%20session%20where%20you%E2%80%99ll,js). Developers like Yuri Artiukh have deconstructed these effects, showing how fragment shaders and Three.js can create eerie **volumetric fog** that envelopes 3D objects in the scene. **Tools:** Three.js with custom shader materials, **WebGL 2** or **WebGPU** for better performance, and techniques like **light shaft post-processing** (e.g. using Three.js GodRaysPass or custom ray-marchers).

* **Real-Time Ray Tracing & WebGPU Graphics:** The bleeding edge of fidelity – path-traced 3D scenes running in-browser for near-CGI realism. With the advent of **WebGPU**, developers are now implementing real-time **path tracing** and advanced lighting in web content[\[7\]](https://www.webgpu.com/#:~:text=Grenzwert%3A%20Path,the%20volume%20in%20real%20time). Imagine product showcases with true reflections and soft shadows computed on the fly, or interactive demos where you can move a light and see physically accurate global illumination. This is made possible by WebGPU’s compute shaders and libraries like **Babylon.js** or **Three.js** (which has experimental WebGPU support). One showcase example loaded a volumetric CT scan with *ground-truth* path-traced lighting, all in-browser[\[7\]](https://www.webgpu.com/#:~:text=Grenzwert%3A%20Path,the%20volume%20in%20real%20time). **Tools:** WebGPU (now shipped in all major browsers), GPU path-tracer frameworks (like *Grenzwert* or **Falcor**), or projects adapting classics like **“Ray Tracing in One Weekend”** to WebGPU.

* **Fluid Simulations & Particle FX:** Eye-catching fluid dynamics as interactive backgrounds. Using GPU-accelerated physics (Navier-Stokes equations) in WebGL, sites can feature **swirling ink or smoke** that the user actually disturbs with their cursor[\[8\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=Interactive%20WebGL%20fluid%20simulation%20showing,Stokes%20physics). For example, moving the mouse could stir a colorful liquid wallpaper, or clicking could splash particles that ripple like water. One famous implementation is Pavel Dobryakov’s WebGL Fluid Simulation, a real-time solver that produces mesmerizing, high-res fluid motion entirely on the GPU[\[9\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=Pavel%20Dobryakov%27s%20WebGL%20Fluid%20Simulation,has%2016k%2B%20stars%20on%20GitHub). These fluid or particle effects add a **living background** that responds to input, providing organic, magical visuals. **Tools:** Low-level: **WebGL shaders** for fluid simulation (advection, divergence, etc.)[\[10\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=Under%20the%20hood%2C%20Pavel%20implemented,get%20wired%20together%20in%20WebGL). Higher-level: libraries like **PixiJS** or **PlayCanvas** for particles, or even using **React Three Fiber** with a GPGPU shader. Many sites simply leverage an existing open-source fluid shader and tweak its parameters (e.g. via **dat.GUI** controls[\[11\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=vorticity%20confinement%2C%20pressure%20solving%2C%20and,get%20wired%20together%20in%20WebGL)).

* **Kinetic Typography (Artsy Text Effects):** Text that doesn’t just scroll – it **warps, twists or explodes** in response to user interaction. Using libraries like **Blotter.js** (built on Three.js) designers can apply GLSL shaders to text without writing them from scratch[\[12\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=Distortion%20effects%20have%20become%20quite,scroll%20and%20on%20mouse%20move). For instance, letters might **wiggle and liquify on scroll** or split into RGB channels on hover, giving a very dynamic, surreal type effect[\[13\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=Some%20text%20distortion%20experiments%20using,scroll%20or%20move%20the%20mouse)[\[12\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=Distortion%20effects%20have%20become%20quite,scroll%20and%20on%20mouse%20move). These “living letters” often leverage displacement maps (for a liquid or jelly effect) or sine-wave distortions for a wavy motion. The key is tying the distortion amount to user input – e.g. scroll speed controls how much the text distorts[\[14\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=The%20main%20idea%20in%20our,on%20how%20to%20achieve%20this)[\[15\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=%2F%2F%20Now%2C%20change%20one%20,0%2C0.9). **Tools:** **Blotter.js** (with pre-made materials like “LiquidDistortMaterial”), **Three.js** text geometries with custom shaders, or even SVG filters (for simpler effects). Combined with GSAP or **TextSplit** for splitting text elements, one can achieve film-quality kinetic typography on the web.

* **Cinematic WebGL Scenes (React Three Fiber & Spline):** Websites now embed full 3D scenes as part of the content – think interactive movie intros or game-like hero sections. **React Three Fiber (R3F)** enables building these scenes declaratively in React, making complex WebGL animations easier to manage in a component structure[\[16\]](https://tympanus.net/codrops/2019/12/16/scroll-refraction-and-shader-effects-in-three-js-and-react/#:~:text=Three.js%20and%20react,you%20can%20find%20on%20the). For example, a homepage might have an interactive 3D product model or an abstract sculpture that animates with state changes. **Spline** is another popular high-tech tool: it allows designers to create 3D scenes with materials and lighting in a visual editor, then export to a web-embeddable script. Developers can simply drop in the Spline embed, yielding an interactive 3D element (like a floating mascot or a surreal landscape) without writing WebGL code. **Tools:** Three.js \+ **R3F** for custom scenes; **Spline** or **Unity WebGL** exports for design-heavy content; **GSAP** can animate camera or object properties for storytelling sequences (e.g., parallax scrolling through a 3D scene[\[17\]](https://www.reddit.com/r/webdev/comments/1objetq/how_do_they_achieve_this_stacked_card_scroll/#:~:text=psytone)).

* **WebGL Post-Processing & Shaders Galore:** Futuristic sites stack multiple shader effects for *maximum eye-candy*. Examples include **GLSL bloom and glare** (for dreamy, glowing highlights), **chromatic bloom** (a combination of bloom \+ chromatic aberration for that retro-sci-fi vibe), and even **CRT scanline filters** to give interfaces a retro-futuristic look. Another surreal effect is using **feedback loops**: rendering the page or video input to a texture and feeding it back with slight transforms to create hallucinatory trails (as seen in *optical flow* experiments where webcam feeds melt into psychedelic colors). **Tools:** Three.js with postprocessing (e.g. **three-vanilla-tilt** or custom shader passes), or libraries like **postprocessing.js**. Also, creative coding playgrounds (ShaderToy, GLSL Sandbox) are often sources of shader snippets that can be repurposed for WebGL effects. The result is an immersive visual feast where the browser is effectively doing high-end VFX in real time.

## 2\. HYPER-INTERACTION & UX (The "Feel")

* **Cinematic Scrollytelling:** The page scroll becomes an *orchestrated narrative tool*, triggering animations and 3D transitions as the user moves. This goes far beyond parallax – it’s full **scroll-driven storytelling**. For example, as you scroll down a case study, a 3D model might rotate and zoom in, or sections might animate into view with precise timing. Libraries like **GSAP ScrollTrigger** or **Lenis** (for smooth scrolling) make it possible to tie scroll position to animation timelines effortlessly. A smooth inertia scroll (Lenis provides “buttery” momentum scrolling) gives a more physical, immersive feel to these stories. Meanwhile, ScrollTrigger can synchronize WebGL shader uniforms or CSS transforms with scroll – e.g., scrubbing through a WebGL video or distorting an image progressively[\[2\]](https://www.reddit.com/r/threejs/comments/171ly1x/any_ideas_on_how_to_achieve_this_effect/#:~:text=i%20have%20a%20shader%20that,ShaderMaterial). The result is an experience where *scrolling feels like controlling a movie*, complete with dramatic reveals and transitions. **Tools:** **GSAP** (ScrollTrigger plugin), **Lenis** or **Locomotive Scroll** for smooth-scrolling, **Scrollama** or **Intersection Observer** for scroll-triggered events in simpler cases, and Three.js or Lottie for the content being animated. This technique is often seen in award-winning sites and interactive editorials.

* **Physics-Based UI Elements:** Bringing the laws of physics to UI for a playful, tactile experience. Elements no longer just move linearly – they *bounce, collide, and spring*. For instance, a menu might open with items that **slide in with a springy overshoot**, or draggable cards on a page might have mass and collision (imagine tossing cards that realistically scatter and stack). This can be achieved with lightweight physics engines like **Matter.js** or **Cannon.js** for 2D/3D physics, or even GSAP’s built-in **Inertia/Physics plugins** for basic gravity and bounce. A “physics-based UI” might include features like gravity-scrolling (content settles as if affected by gravity when you stop scrolling) or **ragdoll-like drag interactions** where elements wobble and rotate as you fling them. These interactions make the site feel *alive and reactive* to user input in an organic way. **Tools:** **Matter.js** (for 2D DOM or Canvas elements), **Three.js \+ Cannon.js** (for 3D object physics), **React Three Fiber \+ use-cannon** hooks, or high-level libraries like **PTSD.js** (Physics-based Transition and Scrolling Dynamics – an imaginary example name) or simply clever use of CSS spring animations via **Framer Motion** (which can simulate spring physics for component transitions).

* **Cursor Morphing & Reactive Cursors:** The humble mouse cursor is reimagined as an interactive creature within the site. Many futuristic interfaces hide the default pointer and substitute it with a custom element or WebGL canvas that changes shape and behavior contextually. For example, a **liquid cursor** effect uses a real-time fluid simulation shader to leave a trailing liquid ripples behind the cursor, which swirl and dissipate in response to movement[\[18\]](https://www.framer.com/marketplace/components/liquid-cursor/#:~:text=Liquid%20Cursor%20brings%20cinematic%2C%20fluid,in%20response%20to%20pointer%20movement). This gives a cinematic, “magical ink” feel to every move. Other variants include **magnetic cursors**, where hovering near a link causes the cursor blob to stretch toward it and perhaps the link itself distorts as if pulled by gravity. This is often done by tracking pointer position and applying CSS transform or shader deformation to nearby targets. Cursors can also morph shape (e.g., from a circle to a underline bar when hovering over text, or into a play icon when hovering media). These nuances make the UI feel context-aware and “alive” under your fingertip. **Tools:** For fluid or complex shapes – a small **WebGL canvas** attached to pointer (using a library like **pixi.js** or raw GLSL for fluid sim[\[18\]](https://www.framer.com/marketplace/components/liquid-cursor/#:~:text=Liquid%20Cursor%20brings%20cinematic%2C%20fluid,in%20response%20to%20pointer%20movement)). For simpler morphs – CSS and JS (e.g., a \<div\> that follows the cursor with transform and transitions). **Framer Motion** or **Anime.js** can smoothly animate the cursor element’s shape and position. Additionally, libraries like **Pointer.js** or **Three.js PointerLockControls** come into play for special cases (like FPS-style navigation or hiding the cursor in interactive 3D scenes).

* **Responsive Multi-layer Parallax:** Parallax is leveled-up with responsive, device-aware depth effects. Rather than a simple background moving slower than foreground, modern parallax involves multiple 3D layers and reacts to different inputs – scroll, cursor motion, even device gyroscope (on mobile). For example, a hero section may have **5 layers of images** that gently shift at different rates as you move your mouse (creating a 3D depth illusion), and also animate on scroll. On a phone, the same layers might tilt based on device tilt for a mini-AR effect. Libraries like **parallax.js** or **React Spring** make this easier, but many devs custom-code it with requestAnimationFrame for performance. One particularly high-tech approach is using a **real WebGL scene**: place assets at different Z depths and move a camera slightly with input – this produces a true volumetric parallax (often combined with shaders for atmospherics like fog between layers). The key is to ensure it’s **responsive** – adjusting parallax intensity for mobile so it’s not overwhelming. The outcome is an interface that subtly *responds to your movements*, making even static content feel spatial and reactive.

* **Touch & Hover Feedback (Haptic-like Responses):** Every interaction gives sensory feedback, often visually simulating the feel of haptic feedback. For example, tapping a button might cause a quick **ripple effect** emanating from the touch point (much like Material Design’s ink ripple, but it could be more surreal – e.g., a ripple that causes nearby elements to briefly wobble as if on water). Hovering over a 3D model might produce a *soft vibration* animation of that model, indicating it’s interactive. These feedback cues make interactions feel satisfying and reduce uncertainty. **Tools:** The Web Audio API could even generate a subtle sound or vibration pattern (if on mobile, the Vibration API) in sync with visuals. However, purely visually: **CSS animations** and **GSAP** are used to do micro-animations on active/hover states. For instance, using GSAP to do a quick scale up \+ drop shadow bloom when a card is clicked, then easing back, to imitate a “press-down and release” feel. Libraries like **Lottie** or **Rive** are also employed – designers create a small interactive animation (like a button that morphs into a tick mark on success) and embed it so it plays on user action. The key is orchestrating these as **instant, low-latency responses** to user input. Modern frameworks (React, Vue) can handle onClick animations in \<16ms for that snappy feel, and GSAP’s quickSetter can update properties rapidly for fluid pointer tracking.

* **State-Responsive Layouts & Cursor-aware UI:** Pushing responsiveness beyond screen size – the UI can respond to the *user’s state and context*. For instance, if the user’s cursor stays idle in a section, maybe a gentle prompt or animation is triggered (“Are you still there?” or a highlight on something interactive). If the user moves the cursor erratically (indicating maybe frustration or exploration), the site might subtly adjust by revealing tooltips or slowing down certain animations to reduce cognitive load. This borders on AI, but on a simpler level it’s done with heuristics and sensors. Another example: **pointer angle** – some experimental interfaces track the trajectory of your cursor and tilt UI elements accordingly, as if a light source (the cursor) is casting a shadow on a 3D interface. This is achieved via pointer events and CSS transforms (update on mousemove). While subtle, it lends a feeling that the UI is **physically coherent** with your interactions. **Tools:** vanilla JS for pointer tracking, **React UseGesture** or **Hammer.js** for more complex gesture detection (swipes, multi-touch). These tools let you listen to inputs like *force, angle, velocity*, not just position, and craft UI responses that make the interface feel less like a flat page and more like a responsive environment.

* **High-Fidelity Motion Curves & Timing:** The UX “feel” is also defined by motion design. Cutting-edge sites use custom easing curves and spring physics for transitions to make everything feel *smooth yet responsive*. For example, menu panels might not just “fade in” – they could slide in with a slight overshoot and then gently settle (using a spring curve with damping). Keyframes might be orchestrated such that as one element slows to a stop, another begins to move (creating a continuous flow of motion that guides the eye). Libraries like **Framer Motion** in React or **Anime.js** in vanilla allow spring physics or bezier curve customization. GSAP’s Power4 or custom cubic-beziers are used to get that buttery smoothness. These small details, while not flashy on their own, contribute to a *futuristic feel* because the interface moves in a way that feels closer to real life and high-end native apps than typical websites. **Tools:** **Framer Motion** (for React, offers drag physics, layout animations, etc.), **Popmotion** or **React Spring** for spring-based motions, and **GSAP** for advanced timeline control. Developers often use dev tools or libraries to visualize motion curves and tweak them – ensuring even a simple hover animation has the perfect ease-out to feel “premium”.

* **Live Pointer Collaboration (Multi-user Easter Eggs):** As a final “feel” feature – some experimental sites even let you see other users’ cursor positions in real-time (if multiple people happen to be on the site). This turns the experience quasi-social and definitely surreal – you might see anonymous cursor ghosts flickering about. While usually found in apps (Figma-style multi-cursor), bringing this to a public site can create a playful *shared experience*. E.g., a marketing site might have a hidden mode where you solve a puzzle together with whoever else is online, with each seeing the other’s moves. Technically this uses websockets (e.g., **Socket.io**) to broadcast pointer positions and perhaps a short trail. It’s not common, but it’s the kind of experimental UX that feels like a playful hallucination when you encounter it. **Tools:** WebSockets or WebRTC data channels for peer-to-peer cursor sharing, plus all the usual pointer tracking on the frontend. This crosses into the experimental, but certainly adds to the “feel” of a site as something *alive with others*.

## 3\. AI & PERSONALIZATION (The "Brain")

* **Generative UI (AI-Morphed Interfaces):** The interface itself adapts and *morphs to the user* in real time, powered by AI analysis of user behavior. This goes far beyond simple personalization like “welcome back, Name” – instead, the very layout, content prioritization, and style can be tweaked by an AI agent to suit each individual. For example, an e-commerce dashboard might reorganize its cards and buttons based on what the AI thinks you need most (your most-visited category appears front and center, a previously ignored feature quietly hides itself). As one article describes: *the interface’s structure, components, and workflow are uniquely assembled in real-time by AI, tailored to each user’s context, behavior, and inferred intent*[\[19\]](https://www.designer-daily.com/generative-ui-what-happens-when-interfaces-adapt-and-morph-for-each-individual-user-201930#:~:text=quietly%20embedded%20itself%20into%20the,context%2C%20behavior%2C%20and%20inferred%20intent). This is achieved via a **Generative UI engine** that takes inputs like past clicks, time of day, even data from wearables, and then selects UI components to render on the fly[\[20\]](https://www.designer-daily.com/generative-ui-what-happens-when-interfaces-adapt-and-morph-for-each-individual-user-201930#:~:text=Generative%20UI%20sits%20at%20the,convergence%20of%20three%20technologies). Technically, this requires a design system of modular components and an AI model (often on the server, possibly running in WebAssembly client-side) to decide how to compose them. **Tools:** AI/ML frameworks (Python backends with TensorFlow/PyTorch or on-browser ML with **TensorFlow.js**), a library of components (e.g., built in React or Web Components) that the AI can choose from, and perhaps a state machine or rules engine for UI assembly. This is an emerging pattern – companies are rolling their own solutions. Think of it as an AI-driven layout generator that ensures each user sees a UI optimized for their needs (one user’s “Home” might be visually and structurally different from another’s).

* **GPT-Powered Conversational Assistants:** Websites now frequently come with an *embedded AI chatbot* that feels less like a scripted bot and more like a knowledgeable guide or even a character. Using large language models (like GPT-4 via API), these assistants can understand complex queries and respond in natural language, effectively giving every site a brain to converse with. For instance, a fashion retail site might have an AI stylist chat: you can ask *“I need an outfit for a summer wedding”*, and it responds with detailed suggestions drawn from the catalog. The key to making it feel alive is fine-tuning the model on the site’s content and giving it a bit of personality. Some sites even give the bot a face or avatar – a 3D talking head or an animated SVG character that moves lips in sync with the generated speech. Voice integration is increasingly common: using **Speech Recognition** (like the Web Speech API or deep-learning models) and **Text-to-Speech**, users can *talk* to the site and get spoken responses, not just text[\[21\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=AI%20voice%20chat%20refers%20to,time%20conversations)[\[22\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=1,back%20to%20you%20using%20TTS). It’s like the site’s AI becomes a real-time concierge. **Tools:** **OpenAI GPT API** or open-source LLMs (maybe running via **WebGPU** soon for on-device inference), libraries like **LangChain** to integrate the LLM with site data (for context), **Voiceflow** for designing conversational flows or deploying voice agents easily[\[23\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=But%20here%E2%80%99s%20the%20good%20news%3A,or%20even%20platforms%20like%20Discord)[\[24\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=budget%20to%20build%20your%20own,or%20even%20platforms%20like%20Discord), and the Web Speech API or **Whisper** (OpenAI’s STT) for voice in/out. Frontend integration might use React components for chat UIs (there are ones that mimic Messenger, etc., out of the box). Ensuring latency is low (via streaming responses) and that the AI stays on topic (via prompt engineering) is part of the challenge.

* **Real-Time Behavioral Adaptation:** Beyond layout changes, AI can adjust the content and even tone of a site on the fly by observing user behavior in real time. Imagine a documentation site that notices you lingering on a code example – an AI pops up to offer a simpler explanation or a related snippet, recognizing you might be confused. Or a news site whose AI notices you always skip sports articles, and thus it dynamically replaces a sports section with tech news when you visit. This feels almost like the site is *reading your mind*, or at least paying deep attention. Technically, this involves streaming analytics (possibly using **Edge functions** or in-browser analysis via **tf.js** to classify behavior patterns) and then using that to trigger UI changes. It could even get emotionally adaptive – e.g., camera-based emotion detection (with user permission) to see if you look frustrated, then altering the UI or offering help. While experimental (and potentially privacy-invading), these features are possible using **WebRTC camera access** and models like **MediaPipe** running locally to infer emotions or engagement. **Tools:** **MediaPipe** or **TensorFlow.js** for running models client-side (e.g., face expression detection, or eye-tracking to see what part of the page draws attention). For behavioral data: using **analytics \+ AI** – e.g., feeding clickstreams into a reinforcement learning model that tweaks the UI for goals like higher engagement. In simpler forms, A/B testing is evolving into **multi-armed bandits** and contextual bandits algorithms (many of which can run continuously in the background to serve different UI variants to different users). All of this aims to create a website that **feels tailor-made and instantly responsive** to each user’s actions and needs, as if it “gets you.”

* **Voice & Natural Language Interfaces:** Interacting with a website through voice or free-form language, rather than clicks and menus, adds a futuristic sheen and can be highly intuitive. We’re talking about features like voice search (“Site, find me **red running shoes under $100**”) or even voice commands to navigate (“scroll down”, “play next video”). The tech behind this often leverages the browser’s built-in **Web Speech API** for basic commands. But the current trend is integrating advanced services: **Whisper** (OpenAI’s speech-to-text model) can run in the cloud (or distilled versions in-browser) to transcribe user speech with high accuracy, even in noisy environments. On the output side, using neural text-to-speech (e.g., Amazon Polly, Google Wavenet, or ElevenLabs) gives the AI or site a *natural voice* (possibly even a distinct character voice). More advanced is **NLU (Natural Language Understanding)** integration: the user can say something vague or complex, and an NLU module (potentially using an LLM or Dialogflow, etc.) will parse the intent. For example, on a travel site you might say, “I want to go somewhere warm next week” – the system infers intent (find last-minute beach vacations) and navigates or presents results accordingly. It makes the user experience feel like conversing with a human assistant. **Tools:** **Voiceflow** is a notable platform here – it enables building such voice and chat agents visually and deploying them to web easily (including a chat widget or a mic button)[\[25\]](https://www.voiceflow.com/integrations/chatgpt#:~:text=ChatGPT%20Integrations%20,interactions%20across%20various%20platforms)[\[26\]](https://www.voiceflow.com/integrations/openai#:~:text=OpenAI%20Integrations%20,for%20OpenAI%27s%20powerful%20language%20models). **Alan AI** is another SDK that lets you add a voice assistant to your app with minimal coding. Under the hood, these use combination of STT, NLU (often backed by LLMs or intent classification models), and TTS – which can all be orchestrated via cloud services or increasingly with local models. The result is a site that you can *talk to*, ask it questions or even give it complex tasks, and it responds intelligently.

* **AI-Generated Content & Style (Real-Time):** Some sites implement on-the-fly content generation to personalize or enrich the experience. For instance, a personal blog might let you toggle an “AI mode” where an AI can **summarize an article**, or explain it in simpler terms, or even generate a custom illustration for you. E-commerce might use AI to generate descriptions that match your inferred style (e.g., more technical specs vs. more lifestyle tone, depending on what the AI thinks you prefer). We also see **AI-generated imagery or video** in web experiences – e.g., a surreal art site might let you type a phrase and get a stable diffusion-generated background image in real time, making the experience uniquely yours. With WebGPU and WASM, running models like **Stable Diffusion** in-browser is now feasible for advanced users (though still heavy). For wider audiences, using an API to generate and then caching the result works. **Personalized theming** is another angle: the site could choose a color scheme or even UI skin based on your personality (detected from past behavior or a quick quiz). For example, a productivity app might reskin itself in calm blues if it detects you use it mostly at night (to be easier on the eyes), or change to energetic oranges if you use it in short bursts in the morning. All these generative and adaptive touches, powered by ML, contribute to a feeling that *no two users’ experiences are exactly the same*. **Tools:** **TensorFlow.js** or **ONNX Runtime Web** to run models client-side (like text summarizers, style transfer on images, etc.), or call out to cloud functions (serverless endpoints running model inference). For image gen, there are libs like **Stable Diffusion.js** or **replicate.com** APIs. For text gen, **GPT** or **BLOOM** APIs. And for integrating all this, consider using a **state management** that can handle async AI responses (so the UI can optimistically update while content is “cooking”).

* **Brainy Recommenders & Adaptive Content:** Many sites now have AI recommendation engines not just for products, but for site content and even UI patterns. A cutting-edge example: a documentation site with an AI that observes your coding environment (via an extension or past activity) and surfaces the most relevant docs, and even *hides irrelevant sections* of a long doc page to reduce overwhelm. This is essentially bringing the power of **recommender systems** (like those used by Netflix/Amazon) to general web UX. Using techniques like collaborative filtering or deep learning (e.g., transformer models on click sequences), the site can predict what a user is likely looking for and proactively adjust. Another instance could be in e-learning: an educational site’s AI notices you get questions about calculus wrong often; the next time you visit, it rearranges the homepage to put calculus practice front and center, and perhaps includes an AI-generated *tip of the day* for calculus. **Tools:** In terms of tech, this is often done server-side with user data. Frameworks like **TensorFlow Recommenders** or services like **Azure Personalizer** can be employed. However, with edge computing, some recommendations might be computed on-device (for privacy), using smaller models. Also, **graph-based AI** (knowledge graphs \+ ML) can tailor content by understanding relationships – e.g., knowing that a user who reads about “WebGL shaders” might also want “WebGPU compute” content, so it suggests that. The idea is the site isn’t static or even manually personalized; it’s *learning from each click* and optimizing itself to serve you better – a true “brain” at the UX level.

## 4\. AUDIO & ATMOSPHERE (The "Vibe")

* **Spatial Audio Scapes:** Sound is used to create a 3D atmosphere that matches the visuals. With the Web Audio API’s **PannerNode**, developers can make audio appear to emanate from specific positions in a 3D space[\[27\]](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics#:~:text=Mozilla%20developer,to%20make%20audio%20appear). A futuristic portfolio might have an ambient hum that actually shifts left to right as you pan your view of a 3D scene, or a virtual gallery might play a whispering voice that seems to come from a particular artwork when you approach it. This spatial sound adds a *deep sense of immersion*: the experience isn’t just seen, but also *felt* through directional audio. Some sites even tie audio to cursor position – e.g., moving your cursor over an interactive map might cause location-specific sounds to fade in (chirping birds over a forest region, city noise over an urban region, etc.). Implementing spatial audio involves creating an AudioContext, placing AudioNodes in a virtual space relative to a Listener node that follows the camera or user. **Tools:** The **Web Audio API** (PannerNode with HRTF for realism) is low-level but powerful[\[28\]](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics#:~:text=Mozilla%20developer,to%20make%20audio%20appear). Libraries like **Howler.js** provide a simpler interface and even support 3D audio positioning out of the box. For 3D scenes, **Three.js** has a PositionalAudio object that can tie a sound to a mesh, meaning as the camera moves, the sound adjusts automatically. In summary, spatial audio is the audio equivalent of parallax – it gives depth and realism, contributing hugely to the “vibe”.

* **Adaptive Music & Generative Soundtracks:** Instead of looping the same track, websites are starting to use *generative music* or adaptive scores that change based on context. Think of a dynamic soundtrack that shifts mood depending on the section you’re in or the time you’ve spent on the site. For example, an interactive story site might have a baseline ambient track that intensifies (adding drums or a faster tempo) as you scroll into a more exciting chapter. If you scroll back up or stay idle, it might strip instruments away for a calmer feel. This can be achieved by algorithmic composition using tools like **Tone.js**, which is a Web Audio framework geared towards interactive music[\[29\]](https://tonejs.github.io/#:~:text=Tone,effects%2C%20and%20complex%20control%20signals). Tone.js can schedule notes, chords, and apply effects in real-time – effectively acting as a mini-synthesizer/sequencer in the browser. Developers can set up generative rules: e.g., a simple melody that varies in key based on the page section, or ambient chords that trigger when certain events happen (user opens a menu \-\> a gentle bell chord plays). There are also ML-driven approaches: e.g., using Magenta.js (from Google) to generate melodies or beats on the fly. Some high-tech sites have even used **AI music generation** so that *each visit has a unique background music*. **Tools:** **Tone.js** (for procedural music and sound effect scheduling)[\[29\]](https://tonejs.github.io/#:~:text=Tone,effects%2C%20and%20complex%20control%20signals), **Gibber.js** or **Hydra** for more experimental audio-visual synthesis, **Magenta.js** (MusicVAE, etc., for learned musical patterns), or simpler, using libraries like **Howler.js** to layer pre-composed loops that can fade in/out based on state. The result is that the audio environment feels *alive and reactive*, not just a static loop.

* **Ambient Sound Reactivity:** The ambient sound design goes beyond music – think subtle environment audio that reacts to user inputs or time. For instance, a site with a night theme might have faint cricket chirps in the background that get louder the longer the user stays on a page (a subconscious cue of time passing). Or an e-commerce site might play a very soft crowd murmur in the background which heightens when you navigate to the “Live Deals” section, giving a sense of urgency and liveliness. These effects can be achieved by layering multiple sound loops and controlling their volume via JavaScript events. One could also use the microphone (with user permission) in creative ways: an installation site might react to the *user’s own background noise* – if your mic picks up loud noise, the site’s visuals and sounds might intensify as if responding to your environment, creating a fourth-wall break in immersion. **Tools:** **Web Audio API** for mixing multiple audio buffers and adjusting gain nodes in response to events. Timeline libraries (GSAP can handle audio too if you plug it into the Web Audio param). If using mic input, the Web Audio API can also analyze it (using AnalyserNode to get amplitude for reactive visuals or sound). For example, you could make a “spirited” site that literally **shifts its ambient soundtrack to match the user’s pace** – if the user is scrolling or moving quickly, maybe percussion fades in; if idle, it goes back to a drone. These dynamic ambient techniques make the vibe feel *personal and fluid*.

* **Dynamic Spatial Narration:** In more experimental uses, audio is used as a narrative device triggered by scroll or navigation. Picture a site that as you scroll into a new section, a voiceover begins explaining or adding a narrative layer – akin to an audiobook that syncs with your scrolling. This is used in some interactive journalism pieces: as you scroll through a story, you might hear contextual sounds or narration snippets for that chapter. Achieving perfect sync can be tricky, but with libraries like **GSAP ScrollTrigger** it’s possible to link scroll positions to Web Audio playback time. Another example is an interactive map with 3D audio “landmarks”: hover over the Amazon rainforest area, you start hearing rainforest sounds in the background, move to the ocean, you hear waves. The seamless blending of these spatial audio clips as you move creates a very surreal feeling, like the website has an atmosphere that changes with your actions. **Tools:** **Web Audio** again for positioning and playing clips, **ScrollTrigger** (or custom logic) to start/stop or cross-fade audio at certain scroll positions. Also, **Audio Worklets** can be used to procedural generate sound in sync with animations if needed (for instance, generating a rising tone whose pitch follows your scroll depth – literally *sonifying* the scroll). These techniques combine the senses – you’re not just scrolling a page, you’re *controlling a soundscape*, often without realizing it explicitly, which can deeply enhance immersion.

* **Generative Foley and UI Sound Effects:** Little futuristic touches in UX sound – for example, instead of using the same canned click sound for every button, an AI-driven approach could generate a *slightly varied*, context-appropriate sound each time (to avoid ear fatigue and give a bespoke feel). If you click a metal-themed button, you might hear a light *“clink”*; clicking a softer, round element might yield a *“thump”*. Generative audio or procedural audio can do this: using oscillators and filters (Tone.js or raw Web Audio) to synthesize short sounds that vary by parameters. Some web games or interactive sites use **procedural footsteps** – if there’s a character or cursor moving, the sound of steps is generated with random slight changes in timing and pitch, sounding very natural. These details, when applied to web UI, give a subconscious richness. It’s the equivalent of Hollywood foley artists for the web. **Tools:** **Tone.js** can generate blips and bloops easily, or libraries like **ZzFX** (a tiny JS synth for sound effects). AI could also be involved: e.g., using a model to generate a unique UI sound palette based on the site theme (imagine feeding the site’s color scheme or imagery into a generative model to create matching sounds – that’s out there, but not impossible with multimodal AIs). The ultimate vibe goal is a *complete audiovisual harmony* where every click, hover, and transition has an auditory complement that enhances the feeling of the action, drawing the user deeper into the experience.

## 5\. THE "SURREAL" & EXPERIMENTAL (The "WTF Factor")

* **Fourth-Wall Breaking Browser Puppeteering:** Some experimental projects literally break out of the single-browser-window paradigm, controlling the browser itself as part of the experience. This might mean spawning multiple browser windows or tabs that interact with each other. For example, a clever marketing stunt could open two synchronized windows that display parts of a scene – your browser itself becomes part of the canvas. We’ve seen music videos that open a grid of pop-up windows in choreographed fashion to create a mosaic animation. Another trick is controlling the browser tab: rapidly switching the document title text or favicon to show an animated message, or using the Vibration API on mobile to create a tactile rhythm in sync with visuals – suddenly the *browser UI* and device are part of the content. One could even imagine a horror-themed site that uses the Page Visibility API to detect if you switch tabs – and if you come back, the site shows a spooky message like “Don’t leave me\!” This kind of puppeteering is very unconventional and can be intrusive if done maliciously, but in a controlled creative context it delivers a big “WTF” surprise. **Tools:** Raw JavaScript window.open and window.moveTo (with caveats – browsers restrict a lot of this now), **BroadcastChannel or localStorage events** to coordinate state between tabs, and browser APIs for notifications, vibration, etc. Some devs have even used **Web Bluetooth / USB** to make the site interact with hardware (imagine a site that flickers your smart lights\!). These techniques border on performance art – used sparingly, they can create a surreal feeling that *the website is not confined inside the browser, but reaching out into your device and environment*.

* **Augmented Reality Overlays (WebXR):** The website breaks the 2D screen and enters your physical space via AR. Using **WebXR**, users with a phone or AR headset can grant access to camera and see 3D content from the site overlaid on their real world. For instance, an online store might let you “see” a 3D model of a product on your desk through your phone camera. Or an experimental art site might put virtual creatures in your room that interact with the website’s on-screen content. A particularly futuristic example is a site that was part of Google Arts & Culture: it let users explore ancient pyramids in 3D on the page, then **“drop one into your room” via WebXR** to view a life-size version in AR[\[30\]](https://www.webgpu.com/#:~:text=Pyramids%20of%20Mero%C3%AB%3A%203D%20Archaeology,Kingdom%20remains%20half%20a%20mystery). This blending of the website content with AR visuals feels almost like the site is *escaping into reality*. **Tools:** **WebXR API** (with modes for AR, using device camera and motion tracking), high-level frameworks like **A-Frame**, **AR.js** (for simpler marker-based AR), or **Three.js** (which can integrate with WebXR sessions directly). Also libraries like **8thWall** (commercial, powerful AR framework) or **MindAR** (open-source marker tracking) expand possibilities. Achieving a smooth AR requires careful optimization of 3D assets and dealing with user gesture inputs in AR (e.g., tapping an AR object might affect the website content and vice versa). When done right, AR features on websites produce that jaw-dropping moment where users go “I can’t believe I’m doing this on a website”.

* **Reality-Blurring Webcam Effects:** In some surreal experiences, the user’s own webcam feed is incorporated into the site’s visuals. This can be as simple as a background replacement (like showing the user’s video feed behind a login form to literally reflect them) or as wild as **datamoshing** the webcam input into WebGL shaders for psychedelic effects. One creative example is a page that turns your webcam feed into particle art – you see yourself in a mirror made of ASCII characters or rippling water. Another might use **AI to remove your background** and then put you inside a scene on the page (like virtual greenscreen). This creates an almost *VR-like* personalization: the boundary between user and site dissolves. If an experience puts your live silhouette into a generative art piece that you can then move with your body, it becomes an interactive installation through the browser. Privacy concerns mean explicit user permission is needed and these are usually opt-in playful features. **Tools:** **WebRTC getUserMedia** to get video, **Canvas2D** or **WebGL** to draw and manipulate it. With **TensorFlow.js** or **MediaPipe**, one can do real-time segmentation (to separate person from background) and even pose detection (so the site can react to your body movements). For instance, a funky site might say “raise your hand to unlock” – using pose detection, it grants access when it sees you wave. It’s all about creating an experience that **feels like the site can “see” you and react**, which can be eerie and delightful in equal measure.

* **Dreamlike Scroll “Illusions”:** Some of the most surreal web experiences play with your sense of reality as you scroll or navigate, essentially performing magic tricks in UI. This could be **impossible geometry transitions** (think MC Escher style): as you scroll, one scene morphs into another in a way that defies typical layout logic (e.g., a 2D photo turns into a 3D scene seamlessly, or two sections that shouldn’t coexist somehow overlap in a mind-bending way). Achieving this often involves clever use of **WebGL shaders** to do cross-fades and warps, as well as creative masking with CSS or SVG. For example, using a fragment shader that takes two textures (the outgoing and incoming sections) and a noise pattern to morph one into the other – it can look like the page is melting into the next page. Another illusion is **infinite zoom or scroll loops**: you scroll but rather than reaching a bottom, content starts to repeat or transform – like a visual Möbius strip. This can be done by recycling DOM elements or using a shader that tiles the output. There are sites where scrolling down makes it appear you’re rotating a 3D object 360 degrees and back where you started – a complete break from normal scroll behavior, inducing a “did I just go in a circle?” feeling. **Tools:** **Three.js** with custom camera rigs to create perspective tricks, **CSS 3D transforms** for folding or rotating parts of the layout, and offscreen canvases to pre-render tricky transitions. Sometimes it’s not heavy tech but smart design – e.g., using identical shapes and aligning them such that one element appears to turn into another on scroll. The goal is to **distort traditional browsing logic**, leaving users pleasantly confused about what they just experienced.

* **Multi-User Collaboration Hallucinations:** This is a mix of web technology and performance art – experiences where multiple users online see effects caused by each other, creating a sense of a shared hallucination. One example: a drawing page where everyone currently on the site contributes to the same canvas (modern take on multi-user Paint), but here imagine it with a twist – what one user draws appears with a delay and maybe with a generative twist on another’s screen. So it’s collaborative but also unpredictable. Another scenario: a horror themed site where at a certain time of night, all visitors see a “ghost cursor” wandering the page – that cursor is actually controlled by an AI or a random user’s inputs mirrored to others. This blurs the line between single-user and multi-user. Technically, it involves sending events via WebSockets to all clients and then introducing some procedural randomness or AI processing. The result is people experiencing something together that feels alive (some might even think “is it AI or real humans or a bug?”). **Tools:** **WebSockets** or WebRTC mesh for real-time comms, **Firebase Realtime DB** or similar for state sync. Possibly use **WebWorkers** or separate hidden tabs to simulate other users if actual concurrency is low (to not disappoint – ensuring there’s always “something” moving or happening). This kind of shared hallucination is the web’s equivalent of a collective dream – novel and memorable.

* **3D Operating Systems & Meta Interfaces:** A wild trend at the experimental end is recreating full operating system desktops or interfaces *inside* the browser, sometimes in 3D or with surreal twists. A recent example is a portfolio that renders a Windows 98 desktop in 3D inside a browser – complete with draggable windows and retro UI, all as part of the site’s content[\[31\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=Evan%20Poliquin%27s%20portfolio%20renders%20a,spec%20machines)[\[32\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=A%203D,background%20with%20floating%20metaball%20shapes). In that case, the creator used a Three.js scene with a tilted 3D monitor and the Windows UI projected via CSS3D on it, making it a “site within a site” experience[\[32\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=A%203D,background%20with%20floating%20metaball%20shapes). Interactions on that faux-desktop actually trigger 3D effects (opening a program might spawn a 3D object). This inception-like design (an OS UI in a site UI in your OS’s browser UI\!) is mind-bending and delights tech-savvy users. It shows that the line between webpages and applications is virtually gone – you can recreate an entire desktop environment with windows, icons, even a start menu, as just a website. **Tools:** **Three.js** \+ **CSS3DRenderer** (to mix flat HTML with 3D objects)[\[31\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=Evan%20Poliquin%27s%20portfolio%20renders%20a,spec%20machines), React for window management perhaps, and lots of asset gathering (icons, fonts to mimic Windows 98). Alternatively, some use **iframe grids** to simulate windows, or libraries like **Window.js** (if exists) for windowing. We’re also seeing “VR desktops” – a site where you navigate a faux computer UI in first-person 3D. These experimental UIs force us to question what a “website” even is – it can be an entire alternate computing environment.

* **DOM Warp & Reality Distortion on Drag:** Traditional drag-and-drop is too tame – experimental sites make the act of dragging something trigger *world-warping effects*. For instance, dragging a element might bend or stretch the content around it, as if the page were a rubber sheet. This can be achieved by capturing the page or section as a WebGL texture and applying a **distortion shader** in response to the drag movement. So as you click and pull, the whole area wobbles like jello. Another approach is using pure CSS transforms: e.g., on drag start, apply a slight rotation or skew to nearby elements, giving an impression of depth or that those elements are being “carried along” by physics. One could also do something like *cut a hole* in the page where you drag – perhaps turning the cursor into an “eraser” that reveals a trippy background beneath. These kinds of interactions really amp up the “WTF” factor because users expect dragging to just move an object, not morph the page. **Tools:** **HTML Canvas** with a cloned DOM snapshot (e.g., html2canvas) to then distort – though performance can be an issue, so better to pre-render static parts. **WebGL** with fragment shaders that use a displacement map that is centered on the drag point (for ripple or swirl effects). For simpler distortions, CSS filter: blur() or backdrop-filter can be toggled on elements as they move. There’s also pointer events that can track pressure (on devices that support Force Touch style pressure) – imagine if pressing harder while dragging caused more extreme warping – talk about futuristic UI\! Overall, the DOM warp idea is about *breaking the rigid grid* – making the UI behave like a malleable material under the user’s control, which is as surreal as it sounds.

* **Illusion-based Transitions & Glitches:** Lastly, a category of micro-features aimed purely at eliciting “how did it do that?” reactions. Glitch art style transitions are popular – for example, when navigating to the next page, instead of a normal fade, the site might simulate a **datacode glitch**, with content splitting into RGB channels and streaking for a few frames (using a shader or CSS clip-path hacks), before resolving into the new page. This gives a *digital hallucination* vibe. Another trick: **non-Euclidean portals** – clicking a link might zoom into a part of the page that *visually contains the next page within it*. For example, an image on the current page might zoom full-screen and you realize it was actually the background of the next section. This needs careful pre-planning of assets to work smoothly, but when it does, it feels like the site has hidden dimensions. **Tools:** **GSAP** timelines coordinating CSS scale/opacity plus maybe a WebGL overlay for fancy effects during the transition (like a fullscreen shader that does chromatic aberration and scanlines during a “TV turn-off” effect). **Barba.js** or **Swup** can help with smooth page transitions so you have time to play an animation between pages. Glitches can be done with CSS animations (keyframing some clip-path polygons or using SVG filters) or with small shaders (a simple RGB shift shader on a canvas covering the screen). Thematic illusions like these, used consistently, can give a site a very distinctive surreal personality – as if the website itself is a character that sometimes “glitches out” or bends reality.

---

**In summary,** today’s web technologies empower creators to produce experiences once reserved for video games and sci-fi UIs. From dazzling WebGL shaders and hyper-interactive physics, to AI-driven content that **literally learns and speaks**, to immersive audio-visual atmospheres and reality-bending experiments – the modern web can be a canvas for futuristic creativity. Implementing these features requires combining numerous libraries and APIs skillfully (and a keen eye on performance), but when done well, the payoff is an interface that **feels like magic** – alive, intelligent, and unbound by old limitations. These trends, observed by creative technologists and Awwwards judges alike, point toward a web that engages all senses and constantly surprises the user. The line between web page, application, and art installation is blurring; the features above are at the forefront of that convergence, defining what “mind-blowing” web design means in 2026\.

**Sources:** The techniques and examples above draw on the latest in web community experiments and showcases. For instance, the use of chromatic aberration and shader scroll effects has been demonstrated in Three.js forums[\[1\]](https://www.reddit.com/r/threejs/comments/171ly1x/any_ideas_on_how_to_achieve_this_effect/#:~:text=shaders%20and%20deep%20familiarity%20with,a%20nice%20intro%20into%20shading) and tutorials[\[17\]](https://www.reddit.com/r/webdev/comments/1objetq/how_do_they_achieve_this_stacked_card_scroll/#:~:text=psytone). Fluid simulations for interactive backgrounds are based on known GPU implementations of Navier-Stokes[\[8\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=Interactive%20WebGL%20fluid%20simulation%20showing,Stokes%20physics). The concept of Generative UI is discussed in design blogs[\[19\]](https://www.designer-daily.com/generative-ui-what-happens-when-interfaces-adapt-and-morph-for-each-individual-user-201930#:~:text=quietly%20embedded%20itself%20into%20the,context%2C%20behavior%2C%20and%20inferred%20intent), highlighting AI-assembled interfaces. Tone.js documentation exemplifies interactive music in the browser[\[29\]](https://tonejs.github.io/#:~:text=Tone,effects%2C%20and%20complex%20control%20signals). Real-world examples like Evan Poliquin’s Windows 98 3D portfolio show multi-layered tech stacks (Three.js \+ React) achieving meta interfaces[\[31\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=Evan%20Poliquin%27s%20portfolio%20renders%20a,spec%20machines)[\[32\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=A%203D,background%20with%20floating%20metaball%20shapes). And WebXR’s use in cultural projects [\[33\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=Pyramids%20of%20Mero%C3%AB%3A%203D%20Archaeology,Kingdom%20remains%20half%20a%20mystery) showcases how AR can extend a web experience beyond the screen. These sources (and the cutting-edge projects they reference) underscore the feasibility of each feature described, proving that the *future is already here* – it’s just a bit unevenly distributed across the web.

---

[\[1\]](https://www.reddit.com/r/threejs/comments/171ly1x/any_ideas_on_how_to_achieve_this_effect/#:~:text=shaders%20and%20deep%20familiarity%20with,a%20nice%20intro%20into%20shading) [\[2\]](https://www.reddit.com/r/threejs/comments/171ly1x/any_ideas_on_how_to_achieve_this_effect/#:~:text=i%20have%20a%20shader%20that,ShaderMaterial) Any ideas on how to achieve this effect? : r/threejs

[https://www.reddit.com/r/threejs/comments/171ly1x/any\_ideas\_on\_how\_to\_achieve\_this\_effect/](https://www.reddit.com/r/threejs/comments/171ly1x/any_ideas_on_how_to_achieve_this_effect/)

[\[3\]](https://www.youtube.com/watch?v=LPzx_QnqC68#:~:text=Of%20www,shaders%20with%20the%20OGL%20library) The OG Liquid Distortion Image Hover You've Always Dreamed Of

[https://www.youtube.com/watch?v=LPzx\_QnqC68](https://www.youtube.com/watch?v=LPzx_QnqC68)

[\[4\]](https://medium.com/@ace_studio/how-to-add-a-liquid-metal-webgl-effect-as-a-background-8fcc42730783#:~:text=WebGL%20allows%20developers%20to%20create,thank%20you%20Darryl) Liquid Metal WebGL Effect as a Background | Medium

[https://medium.com/@ace\_studio/how-to-add-a-liquid-metal-webgl-effect-as-a-background-8fcc42730783](https://medium.com/@ace_studio/how-to-add-a-liquid-metal-webgl-effect-as-a-background-8fcc42730783)

[\[5\]](https://www.framer.com/marketplace/components/liquid-metal-logo/#:~:text=Liquid%20Metal%20Logo%3A%20Free%20UI,animation%20with%20realistic%20metallic) Liquid Metal Logo: Free UI Component by Fred Moon \- Framer

[https://www.framer.com/marketplace/components/liquid-metal-logo/](https://www.framer.com/marketplace/components/liquid-metal-logo/)

[\[6\]](https://tympanus.net/codrops/2022/06/27/volumetric-light-rays-with-three-js/#:~:text=A%20coding%20session%20where%20you%E2%80%99ll,js) Volumetric Light Rays with Three.js | Codrops

[https://tympanus.net/codrops/2022/06/27/volumetric-light-rays-with-three-js/](https://tympanus.net/codrops/2022/06/27/volumetric-light-rays-with-three-js/)

[\[7\]](https://www.webgpu.com/#:~:text=Grenzwert%3A%20Path,the%20volume%20in%20real%20time) [\[30\]](https://www.webgpu.com/#:~:text=Pyramids%20of%20Mero%C3%AB%3A%203D%20Archaeology,Kingdom%20remains%20half%20a%20mystery) WebGL / WebGPU Community — Showcase, Tutorials, Examples & More

[https://www.webgpu.com/](https://www.webgpu.com/)

[\[8\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=Interactive%20WebGL%20fluid%20simulation%20showing,Stokes%20physics) [\[9\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=Pavel%20Dobryakov%27s%20WebGL%20Fluid%20Simulation,has%2016k%2B%20stars%20on%20GitHub) [\[10\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=Under%20the%20hood%2C%20Pavel%20implemented,get%20wired%20together%20in%20WebGL) [\[11\]](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/#:~:text=vorticity%20confinement%2C%20pressure%20solving%2C%20and,get%20wired%20together%20in%20WebGL) WebGL Fluid Simulation by Pavel Dobryakov | WebGL / WebGPU Community — Showcase, Tutorials, Examples & More

[https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/](https://www.webgpu.com/showcase/webgl-fluid-simulation-by-pavel-dobryakov/)

[\[12\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=Distortion%20effects%20have%20become%20quite,scroll%20and%20on%20mouse%20move) [\[13\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=Some%20text%20distortion%20experiments%20using,scroll%20or%20move%20the%20mouse) [\[14\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=The%20main%20idea%20in%20our,on%20how%20to%20achieve%20this) [\[15\]](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/#:~:text=%2F%2F%20Now%2C%20change%20one%20,0%2C0.9) Text Distortion Effects using Blotter.js | Codrops

[https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/](https://tympanus.net/codrops/2019/02/06/text-distortion-effects-using-blotter-js/)

[\[16\]](https://tympanus.net/codrops/2019/12/16/scroll-refraction-and-shader-effects-in-three-js-and-react/#:~:text=Three.js%20and%20react,you%20can%20find%20on%20the) Scroll, Refraction and Shader Effects in Three.js and React | Codrops

[https://tympanus.net/codrops/2019/12/16/scroll-refraction-and-shader-effects-in-three-js-and-react/](https://tympanus.net/codrops/2019/12/16/scroll-refraction-and-shader-effects-in-three-js-and-react/)

[\[17\]](https://www.reddit.com/r/webdev/comments/1objetq/how_do_they_achieve_this_stacked_card_scroll/#:~:text=psytone) How do they achieve this stacked card scroll effect? (AndAgain.uk) : r/webdev

[https://www.reddit.com/r/webdev/comments/1objetq/how\_do\_they\_achieve\_this\_stacked\_card\_scroll/](https://www.reddit.com/r/webdev/comments/1objetq/how_do_they_achieve_this_stacked_card_scroll/)

[\[18\]](https://www.framer.com/marketplace/components/liquid-cursor/#:~:text=Liquid%20Cursor%20brings%20cinematic%2C%20fluid,in%20response%20to%20pointer%20movement) Liquid Cursor: Premium UI Component by Netzoic — Framer Marketplace

[https://www.framer.com/marketplace/components/liquid-cursor/](https://www.framer.com/marketplace/components/liquid-cursor/)

[\[19\]](https://www.designer-daily.com/generative-ui-what-happens-when-interfaces-adapt-and-morph-for-each-individual-user-201930#:~:text=quietly%20embedded%20itself%20into%20the,context%2C%20behavior%2C%20and%20inferred%20intent) [\[20\]](https://www.designer-daily.com/generative-ui-what-happens-when-interfaces-adapt-and-morph-for-each-individual-user-201930#:~:text=Generative%20UI%20sits%20at%20the,convergence%20of%20three%20technologies) Generative UI: What Happens When Interfaces Adapt and Morph for Each Individual User?

[https://www.designer-daily.com/generative-ui-what-happens-when-interfaces-adapt-and-morph-for-each-individual-user-201930](https://www.designer-daily.com/generative-ui-what-happens-when-interfaces-adapt-and-morph-for-each-individual-user-201930)

[\[21\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=AI%20voice%20chat%20refers%20to,time%20conversations) [\[22\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=1,back%20to%20you%20using%20TTS) [\[23\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=But%20here%E2%80%99s%20the%20good%20news%3A,or%20even%20platforms%20like%20Discord) [\[24\]](https://www.voiceflow.com/blog/ai-voice-chat#:~:text=budget%20to%20build%20your%20own,or%20even%20platforms%20like%20Discord) How to Build an AI Voice Chat with No Code in 2026

[https://www.voiceflow.com/blog/ai-voice-chat](https://www.voiceflow.com/blog/ai-voice-chat)

[\[25\]](https://www.voiceflow.com/integrations/chatgpt#:~:text=ChatGPT%20Integrations%20,interactions%20across%20various%20platforms) ChatGPT Integrations \- Connect with voice and web chatbot

[https://www.voiceflow.com/integrations/chatgpt](https://www.voiceflow.com/integrations/chatgpt)

[\[26\]](https://www.voiceflow.com/integrations/openai#:~:text=OpenAI%20Integrations%20,for%20OpenAI%27s%20powerful%20language%20models) OpenAI Integrations \- Connect with voice and web chatbot \- Voiceflow

[https://www.voiceflow.com/integrations/openai](https://www.voiceflow.com/integrations/openai)

[\[27\]](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics#:~:text=Mozilla%20developer,to%20make%20audio%20appear) [\[28\]](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics#:~:text=Mozilla%20developer,to%20make%20audio%20appear) Web audio spatialization basics \- Web APIs \- MDN Web Docs \- Mozilla

[https://developer.mozilla.org/en-US/docs/Web/API/Web\_Audio\_API/Web\_audio\_spatialization\_basics](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics)

[\[29\]](https://tonejs.github.io/#:~:text=Tone,effects%2C%20and%20complex%20control%20signals) Tone.js

[https://tonejs.github.io/](https://tonejs.github.io/)

[\[31\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=Evan%20Poliquin%27s%20portfolio%20renders%20a,spec%20machines) [\[32\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=A%203D,background%20with%20floating%20metaball%20shapes) [\[33\]](https://www.webgpu.com/showcase/windows-98-portfolio/#:~:text=Pyramids%20of%20Mero%C3%AB%3A%203D%20Archaeology,Kingdom%20remains%20half%20a%20mystery) A Windows 98 Portfolio | WebGL / WebGPU Community — Showcase, Tutorials, Examples & More

[https://www.webgpu.com/showcase/windows-98-portfolio/](https://www.webgpu.com/showcase/windows-98-portfolio/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAClElEQVR4Xu2WTYhOURjH/xNTxDREI1HTTFKiLESJLORjLGiyUmyFUkSIlWhKFha+ScnCRrPTNMrUvGWaBcqGyEdJLG0slCT+f889r3Ofe95730t2869fM/ec5z3veT7vC0zp/6uTdPvFCslen6utWWQLWUo63J6kg2+QNX6jQrK/i5qO9JJH5Bz5RDbntzGdXCH73Xq72kOuo0akTsMuNER+kl25XbtgAzW9jDST3Cc7/UZKc8kTcovMJyvJtGhfhz0gB6O1v5GcnEQbTi0jn8kRv5FpFXkDs/sX9ZO3ZL3fCJpBFpLd5AfMAz3Pjo2ofbB0drl1SfbbyLzsWX+3I90YapoxcsqtN7WO3CRPyTdYJ+h5dWxE3cnw6iG3yRnynlyApV0OTpDjKF5K5+h7/HpOMlINqZa8FK0GrNi99sKiugkW4ZP4U3sqXpWBT/MJ2Hk+C00pDUrHMKy1vcKFdJCXQq9xoT3/5YqSulXpjCXbVs7/1mLyEa3zWnYhSU7ImQbyXl8kX1FMv855Rxa49aZU8d9hhZhS1YV0sL4gTmkYIy9gYyRWZcrUQV9gsyelEAEVa0pySA2xI1pbC4vO0WgtSBdXp6njklJoU57Eks0IbEx4yeN4suvVcI+MojgA1VnqMJ2XVJgLrQo6SN4/R/HSIXofYKND3foM9oWpCCiVj5GPZk6hoJW2MvWRVyhO2EWw+aMLqN01l1JRDFIqX8LOa0phO0wekkHYhVbEBgnpM2fJ5ez/oFT9tFI4Q+SGorx4DeuCq+QaytMVpGiOk+XZ8xxyHla8W1HSNZmWwMpDcysn3e4ALJeXUCy8MumHlgpWrX4M9poJbIjsvFToesW09dOjrjaSQ36xQnrFDPjFKbWjXwB5dIhfMIGxAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAXCAYAAAAyet74AAAA0UlEQVR4XmNgGAXUBHxA7AnEslA+NxC7AbExEDPDFHEC8VQgrgLiZ0DcAcRrgDgaSs8CYlaQQhcgrgZiTSB+C8RzoJpBwBSI30PVMCQAsRkQ+wHxX5ggFNgA8W8gLoIJgNy0hwFiFQtUDESD+CBbQLaBgRIQPwficpgAECgC8RMgns6A0Ay29j8QN0D5jEDcDMRXgFgeKgYGrQwQR58A4tVAfJABYq0EsiIeID4AxFsZIL4VhophAGzuwwrSGCDuiwNiATQ5FAAKeRiOQJMbDAAAPY4is2frKHoAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAYCAYAAABZY7uwAAADY0lEQVR4Xu2YW4hNURzGP6EIuUaiNJIS5UFILg/uEkkeFOXJNUWEKCVS8uDBnZQ8eJE3iaKMyANTXtxyySUeKC8e1CTxffM/a87aa6919pmZ5pyh86uvmVl7nTV7f+t/WfsADRrUm77U4HCwAM3X5/55BlCLqYlUr+Ca0INeoGaEFwrQ/KvouLE9inHUA+oY9YValL2MPtQZakswXi3rqfOofyRp42dSJ6mz1HKqd2ZGgkMwg45Sf6i1matmWDM6HwX9qRvU6vBCDZE5e6n7VBM1HBbZF1GwcUOpJ9QlagQ1FVlX9XC3qe3eWGeQ6Y/QeZO7yjTqKzXHGxtPfaSWemM5JlHfqV3hhRJa+A1sXlfQzbxF9gZribJDZoz2xgbBMucyInW3H2zyOuo3bIf190B/EtkMW0SLhWj+Mli4Cv1cgXihVxO4Sx0IxmuBnvUm8gbpWZthGaRMyjAbln8tVCvK+Tjdn0SulBQyEub8YeoDdQKWpjL8ISzfQ5O0jv5PON7dOCNSBoXjGXTTUQdRXkDhGbIRFnULYRG4H+XapWKstA3Tch9svTBKfYbBat6nDuhg2yfT6OFlQmhEoUEuB6/DWnmIW0APFqJU0fFA10IzFEXqhko/H81NbUZ3Mop6h7wRhQaNpT4jXRcqGSRkqsxtRjYqdM74iXy6ah3dqG64lqSMSI23o47yC1ZYYxQZ5HbGT0F3bHgOOzb4VJNiqk8q9rrhajWk7ZNp3EaGRrjnSzWhtg71A3b2ieEWVvGNIYNbqZXe2CxY9Oz2xhwyUp1MHS2FDm0LqDUdkE7HRcRKgTZQG6mIj6ILsZ320Ry1SLXKEP1T/+Sth7tG3UL+QKjIUAdL3kw3MwFWTvy3hLnUN9im5nDnklSBdig6niFvoosudZEWWDd8CjMgFiFKvcfIRlutUXd9T22iNlAvqG1IHDtcgVaaVaKJeoX8CXgM7PwjQ9TedS6KRZlDu/QStl49cYdZyR1w25FTO6k71CqYQVMyM/LoM0eo06XfHbH6k8KtIUV3q6egXX4N6zJ63T+HyunlULTdoyaX/lbXOA4rxktQuSsJ5b/SWeemHo12byusFpxCvpBWQl98qQCrte+BvZY4zfPmhahw65Wknl911Iz51I5wsAC9klT8OqFBg/+Dv9v4rbHdbhkdAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAAA6ElEQVR4Xu3RMQtBURQH8CNsJgaJWCwmyaTsGGy+gZLZQNlkVEr5BlaDwWD0ESS+hkFRJv6nc693FdfrDXd6//rVuXXeue/eSxQmjMOUoANdmEJe1RMoGn3W9OECT7jBCTZwhwfUvFZ7qiQDeNASKnBV65bRZ405pA0RKEMdokafNXoI4zpQnA3hIzZhpfC9vZOABslrMK5TJB/pcD2EMckd5WAHad0wIrlQ055kuA4/8xGyap2BA/3+66/hjdYQU2t+tTN5Q31lADNV89HmJMczj/w3BdhCDxYkQ+MfHT7DuyYp4Mdu8gL7RyziKJrFUgAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAABB0lEQVR4XmNgGAWjgI5AE4hDgDgZiJuBWA7KbgRiFSR1eEEGEL8D4v9A/BWIrwDxBiD+BsQ/gdgSoRQ/MGaAGAAyaAoQGwLxJyjfE0kdXoBsiC8QMwKxPhDbADEzkjoY8ADi10C8BohZYIIwQ0AYxCYGTALidGQBUg3hBeKdDBCXwgExhoC8FQzE64C4C4hPALE4TJIHiN0ZILEBwiC2MAMkXGCAFYhnAHEOVLyVAS08yhkgAYqMDzBADIcBByA+z4CwGRQeRXBZIgHIoqUMEFdgDQ9iAMgQEAYBHQZIeIASYQRcBRFAlwESBqDUPRmI9zBAAheUZUgCoNgBeQUEQAHNhiQ3SAAA6hYy9u4uqwUAAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAXCAYAAADHhFVIAAAAlUlEQVR4XmNgGHjADcSFQKyGLgECRUD8H4jT0SVAQASIHYCYFU0cN2AGYmMgtoGy4QBkxAQgrgXi00DciyzpCsQ1QMwHxAeAeCUDku5MINYHYksg/gbEETAJGAC58ioQTwFiRjQ5Bg8g/gXELkCsDsQNyJIzGCCOEWaABATIHXDgB8RPgHgDEBcwYDGaB4gF0AWHDgAAPfUSVNIdKk0AAAAASUVORK5CYII=>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAYCAYAAAD3Va0xAAABG0lEQVR4Xu3TP0uCURTH8RMhFIkS9RYaXEQosII2l4aGoEFxEYL+0K6rIQ2ujTX3FmyoISKo19HgEGRTQwTV93bP83Si2yVadPAHn+E593rw/hMZZ5wRSwFbqKOLBSyhiWNsYCadHckeBnhXL7jCCW61do+Szo9mEc/if9Qw9TyutX6n39HYRm4pNrtaf0PF1IuoYsLUoo3cd7JsO7aPHfP9mf80CibW6Ejrj+JP2J3gIU4lsGe20RlyWl/Fk9bddXD7sSn+BM+xovPS2EY99OXrSjyghkmd6+7ZMi4wq7U0oaVlMZXO+J62+pFQo98yjxvx/+oA08mA28AWXsU3cs+knAwGModLdLBmB9bFPwdr204IJCN/fH/Dywe1NkYs1sckRwAAAABJRU5ErkJggg==>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAA5klEQVR4XmNgGNSAB4jF0AWRgSMQ/wTi/0C8B00OA8gA8RMgbkWXQAc2DBBT/dAl0EE5EL8FYk10CWaooC8QiwPxGiA+wADxEByAFFwA4nYgToOyfwHxJGRF8kB8C4grgZgRKpbAAPEx3H0sQLycAeI7RZggAxb3gRggAZB7QJpAAERjuA/kcJAV6TABIJAG4gcMaO6DKfREEgOF328gDgJiSyAuBAnqMECshjmanwESZV+B2BiIq4HYBSQB8mUOEF8E4rlAvBuIA4H4ChDvBOJeIGYFKYQBWCoBBToIgCRFkPgjEAAAHLgn/hbkvHMAAAAASUVORK5CYII=>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAnCAYAAACylRSjAAAEPklEQVR4Xu3dS6h1YxgH8FcocpdCkeM2IKGQSwzco0hRrkUptwGiyOxDSoaSAUoGKBETGZB2CJkrhQGJkZQyksv7t/b6ztrvWd/ZZ+/vfJ3O5/erp7PXu9Ze+z3rTP4971r7lAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuwf63D2sENOqAdAABgeZ/WerbWlYOx/WrdN9he1CW13msHAQBYTgLbM7VuGYwlvC3bXYt9ar3QDgIAUMo57cAcp9V6pBnLOb5txpZxRK3b20EAgKGbShcYTq11bq3na103c8TWO7J083yy1kqtO2vdW+v4wTGLWCSwHVu665POWl738vnpuvXOL90cn651TOnm+lzp7nGb5/XSdds2Ktcj88n5r5j+3HfmCABgr5Lw8ketu6bbWeL7pNaX09eb6dZaP86pU3YePWtS65+yGoCemG5f2B+wgEUCW7xWuk7Y0KR0S6RDCbp/1rp0ur1Sujm+Wbr73XblhzIbBjdiUrpzn1zro1qvzOwFAPYqfWAbdtXSPfq7dN2bOLNsrAN0Xq2r2sFNMildQOllmfLX0nUEe/eX8ZCZMDSsq5vt9X63Q0rXSWsD16TW481YrmGu5TAQZs6ZZ+Yblw/29X6pdVI7WH1f68F2cGpSVq9HfodDV3f9J6H752YMANimxgJbXicM9GMJQq2Lmu3ban1d1oaYzTIps4EtISWdqXS/ermB/+DBdu+lpt5ttg9fPXSN42r91A6WxQJbP5bQ13bl4vdaZ7WDpXtv5jpmUmavRythe1fvBQC2mbHAllDRd4VyL9bLg329sa+zSHhqQ8zQCaW7z2u9yv1ZYyZlNqBcXLrlx3QD0yG7odbZg/3rWWRJNOdPoGq9XdYuQ7aBLQEtc06QParWi7Wemu4bSift6HZwjkkZD2yn13q11ue1rmn2AQDbVB/YcuN7ltXSOfut1mOlC0IJQR/sPHrVMoFtd0xKF1CyPBsfT7ezBJpgmXCyY7pvnkUCW5ZcE7haGX+/Ges7kwm5uXY31/qr1o3T7XTREqRaOc8iX6Kb+/i+KN1nJegNH2x4p3Rdxu/K+DIrALANtR22NjjsmFZrqwJbjD15mYcPxu5fG7NIYMtyaLpsrRNrfdOMDTtsmUs7zzfK7Pe4Rc6zzIMTY/K5WcKNsaVXAGCbagNb67NaF9Q6sBnfysA2Jh2va2ud0e4YMe+JzHTDHq71YekC29g5c0y+wiM/e+2SaCtP3uZcw/fcUdYGu2Xlc9Ndy9/q+loPzO4GALar4c33dzf7ImHioHawjAe2PWWlrM4x/x5q7CGBhKBhENodOU8etPiqzO/avVW6Y3LthtdyTLqXww7mjlqPDrY3Q55qzXeyjf3NAAD+ly6r9VA7uEH3lM0LmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwB70L741q+XuBuYcAAAAAElFTkSuQmCC>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAZCAYAAACfIRhSAAADrElEQVR4Xu2YWaiNURTHlwyRechQylCmiAchUxmiPJBQFOqWMqWIouThXlKG8mCMKB6Q4YEHQxG3lIQnEZFCpBRKKEn8/9be2Wed/Z37ffd8J657fvXvnLPX9+1vf2vvtdbeR6RKlSrNhNZQZ9tYJh2gtraxKdEemgkNhloYG6HDDkNjraFM+kHn3WeTg4O+Be2A3kAzCs3SCjoArTTteTEZuiD5r+aKUyvquO3QT2hRgVUdWS+VezGu8P3QJmv4l+kK3YOOQj2gUVDLwN4OugqtCdoqwXjoMTTAGsqEeZlpKHeGQe+h9dbgGA09E72ukvgJXGwNjaQTtAW6A00wtrJgJesjOtAfouHJ36xyIStEw7ijaR8HLYCWQdug3tAUqA7aBU0Tne0scNWflHhxSgvfgWF/U9RhYfRkoYtoX/wsYCJ0BLoPfRMdMH+PCS8CJ5wse6DPojmR+gpdFO3jiWvjCurrb0gBc1xsktLAED8GXYFGSuOcz3s44Q+gh6L9rS64IoBO4QsyVCxcffWiRSPGbFEHfYemBu39oefOdlq0KqeB/b0Unem0DIHOOfF7Y6HTNkIfJEVoc2Y5w9xHxV7OOy6p2nnHfRHNhSF7nY35M8yP051isL+30EBrMPAluaq4urgq8igo3BIx8mpNexSG0WtoszU4ynEc77E2Tg5Xr90netjfJ9HKXoqeojnsuGRbnaXwE/0OeuXE3US38CLPJNEw44Bj5O24hsgSquGqY7opJ0wJ+0j77N8Vs9QMc4UwjFntYiQ5zt9H2yPR/SGr7kFoqyRXW1Z45sZe1tAAdBqfV05h4DumdhyXp3+xJHjNJYkfxL3jqDrRzTIHvVB0i0PNd201ohN0W5LPpUwZSc9KQ7gV4XYpiwOZPj6K5jpPG4lMMnfT1yW5MHjmiJbmmHPDqnpZtBDw4WzjKYClnYNn/4NE+zrrflv8Kk1KC1noDu0WLXwcQ5q9HMe5FHohGrZnRCegaOPvCwPDtRSsWNyXMR9aYqHK82zRLIk65pQUn4M9fA6dzaNXXnBxrIXmWUMJ6GQWn4KNL726DroGzRV13Ijwggi8hycDhoBd+jHHJcGZ4/GHz1suxX0tEZ3lmNP/OvTkU9ENLxP1IYmHjYWrk8t2eNDGHLJT/oQqQ6xoWQcwgd8QLQ5DjY2hxVDP+7++3OAsr4LuQvsk299EfCnmJ38Pz6g8XoWa5WxJMOnbxM8x1UIb3Pf/EiZa5ow84b/OsdCtUqWZ8gsIdrlwnbijYAAAAABJRU5ErkJggg==>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAYCAYAAAB0vVZPAAAGEElEQVR4Xu2aa6hmUxjH/3LJNZcRacjQILlfRiaXxjVyN5RbEjXuiWloKA6a+OISExqjCTFuicYll8yZCOEDhSlRyOUTH4Qacnl+nr3mXe86e5937XeOfc55z/7Xv3fvtfZea+/1/NfzPGvtV2rRokWLFi0GCVsaN0wLJwE2N26cFtYFjWxnXD+taDEuOMl4l/IE2ZTtcvvZ2fhc8VsbRxnXGP8xvmncrLu6RSbWM15sfMq4Y1JXFwcYV8qNPxqasl0//RxhfEHu5WuDAfzOuCitaJENvMew3GindFfVwibGF43npBUVaMp2dfthgi423pBW5OBw+Qw4Na1oUQuHGRcoz4NU4QTjJ8bt04oKNGW7fvqZbVxt3CWt6AVU/JNxz7SiRaPAqywz3pdWjIKmbNdPP1sbPzSen1akICmlYUILM5EEdFgedqYqWDwwFocY5xTnM4ynGw9SJ5GfJh83rolXklvJk3jqphdljCeh7nj5eNPmwfI2dyquibGt8TPjmWlFhKZsN1b9LDU+IZ9spaCTj413GOcVx3+o3qwcRMwwrpLngO8bHzJeZ7zQ+JV8YK+R50Xkd6/LQ2tYwFxh/F7dOSTCC2VLjI/LvcVNxt+Mc4vrAhD+t8VvGZqy3Vj2g2d927hFWgGYwV8YF6qj2IvkA1YnN5gIOFduvFx+ZJz5353VYEyYzX/Lc7mAG+VjdHtxDSCn+lPdC5hZxt+TsrAYIJcKeSHGwUgvq9vLct+Pxl2jsoCmbDfW/fBO3xh3SCs2MC6XD06cZPaTG/TCvnIvUummJzAelYdNwmcAY4TQEFwAXgwvF4uvrAxDYJDYu4QVOYxDYJXx6tqO7SI8e93N6Tr9MNFYcT9gPFLVtq6cZDRGo+QCdAz47Tc3GA2Xy139ZASCHFb3eGAQhBaH0jLxlZUFQdJGQF1B5tpuD+MK40tJeS5y+0GMt8i3qHaTe9TziroUvNMvxv3KKnC7l0ZlJN9fq7/cYLzB7MdwuSRc5nz1mIiCrGs7rh9WfUHm9pOKDE9ZtWFe9U5rOzsxKgt5EKu62cZrjdsY7zfeJjcgrpjwy+xhtuD5SPiZGeRWr8pXkYAHutX4sLp36Al/N8tn7nz5zCIkPGk8S75/97TxXuXv7JPrcG8uT5O/Wy+MpyCxxw8a6U1ybRcwmiApm6byEJvbD3bGZmGCI9Y0Hw5gEceiMOTPa7G33B2HxBTDo+ow0Kz8jjNeZjzQ+K7c6IhppVyQfNI6WZ74PygXFvfyiYgXPcO4v1ykPDygDR4WAQNEfHVBhPylOtcihtiYTQMj8W7pqnA0QcbepEyQYVHDewdUCZIxRpDHRmUgx3bxPVWCRIjsDKxRZ8xj1O0HsH31qaoXPLx3qVgZ7KvkD/SI8Q25gGjsNfmH/JAT0Pgzco84S94gBiJZ3t34jjrG4doV8g6591B522yKhiQ59g4cPya/FmMukz8bg8dWSvrCTWEf+UzGQ8BfjRcY34vK2Pq4uyDHofxZeVQJZX8Z75FP7vi6D+Rt/hyVcRzeOQg1FjnIsV2cjlQJkvNX5LsIC5I6ULcfjolqZ6vc44b8M7b/CPBQ8T82aBQvGM5pGJHgagGDE+cPCDEIjmsXF9cEDBUEhKvP5W4fxA+Y9sPsXKXu1e1UxJC6FxUxetkuoEqQAUwAhFeFnH4ow/sdXZzjYNJnJi1brXJvnA0eBo+HZwwhDNFcIhchx8GrTZeHN8Q0vzjHe+Ilr5SHa+pDuN5LLjrKaQthB0+LSBcZj5FvI0xVzJRvRDOm/aKXIK/XuokE22Nf+sHpsLpfWJTHIBqwNoi9am3QKO4cV4zI3pIvYtjXAkvU+ScK+dHz8gULiTg5CjkHG8j8/Yi2SIK5Z558EUPIB1xP+AiLGPoizPE1ZJ1eYADAWJAWpAbuBT5f3ilPM8j7SI3I6WMw7kvl6Vm/mCNPS0LaAeMcGaAF7Mun2DEBQkEYDAr5YxicTTXSdW+UnKfLf/JLBisGbdBWDO6ra4RBBGNITjo3rRgD4NVwJP8nsOGQfGK19hwQMDmJNCO+cEwCsHtCRGzF2KJFixa18S8WmoNePIr8qAAAAABJRU5ErkJggg==>

[image12]: <data:image/png;base64,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>

[image13]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAAYCAYAAACYyDNZAAAIcElEQVR4Xu2beawdUxzHv2IJpUGJJbaUijVBrI2tlhYRYktKCLWUVARtgyB41Ujte0S0CI2dIPYl+iyh4Q9LLElFLLEEQQgSre336W9+veeeN/f2Tvte+2473+SbeTPnzJkzv/Nbz9wn1ahRo0aNGjVqLM9Y07hyfnEZxxrGVfOLVcEg6xlXzBtq1ChwqPE6dWZg3aBPaxnXMa6QN2TYzPhocayM/Yx/Gf8zvmxcvbm5Ro352Mk4S2407dAN+jTe+I98jjOytlbY2/iEPIJXxsbGr41X5A01ahhWMz5pPDZvaIFu0KddjX8aj88bWoAod6vxgryhE+wl9zqH5w01ahgONr5vXD9vaIFu0CcM6w/jznlDG4w0fmIcnjcsDFjlT8Zt8oYayz3w3Hcbb84b2mCw61O800fGdbO2dljb+I46iHoUnrz8YXKvRAHXKy9Mayw9sC7UONsbD5GnZqwP67SPGpsL1DVjCpbVBJvI07kp8nHSOgjlorDfMCE7ZKx9fg2ggCjiUcV5GbpBn5DdLnKZkcJiKBjZwjY4clCz3ac29yGI94zTjKcXf89VNQ9VY2DArtbD8gKcGuYq41S5sbwp3zQ4zjizuHaP8UfjDtxcYLQ8PTtDrkgXysdCuQCGc7nxG3mRTx1CAX9ycc6zP1AjdeL4VXKeoxv0aX/jp8bJBT+Tvycyqgqi8+vGoXkDYJtxjlzoYYHj5IIdzPnyYMUw4/NyBeyUl8y/sz0ukq/JWck1IgjXMMCIZJsbv1Nz4Y3h0W9ScU4UZI69ao4ojIEHRx/Qiy2LPiOSPoCoxDN4Vo5u0KfdjN8bxxbnzBPHVbX+CiCPL+VRvgkrGR+Qe7O0SOuvfBmv+LfKvcIQDdz3EMZl/BQHFOxWlK0JC4vipqkai8xipwaGPEgBU3kT6cqUIgyE9nuNuzc3z0crhaqqT6Spp8ijdFWUpbXtGOkt6fPsgpFKM1ZZ/bWtPOpC/m6Flg6HF+bFyY8RDuDYX/kyBeCr8h2kFLwYHnRRvEUnwGMjsADvxPYwqVK3AiXNlToMjGOgzMAACvKgPGLy7eZz9R0vgJxIl25XeV3RysA61ScMA0N8yvix+o7TCTDKK413dEjqTnCg8V81fy6IjQp0Jt6Xb3znyp3SnnK55XocQB6/qTktX9DAAqURZiPjF+qffJkHkpvmuzKtrvcXKDrLouaSQFXPCjvx4ItjYBPk6c85akQxIlQ+XoD6CwP8RZ5O5WhlYFX1CQdLfZaPM5BALhgYhhZgHsgnnTf9qMvYoAkn0eoDdCt5LBBIWDfASufJ046RxonFdRTnCOPTcs9BFCKXpzaYXpwD0jB2twBbl68Zr5b/nIb04zzji3KPcJN8d4t5UEfgKRibIp6xAUdenHbmlEY9DPRS+Zwopina8UKEa7zjScYNjLfJ09X05zxbGG+Qe/MT5YoX89jOeJrxOXn9UObFW4FnIINjKrAsDcuxqAaGjEh9yBhCpiAMDGfHmgRYIz4gc50NlLflDiMFOvKt+nrsKvoE2hkYcmT3NF2z/gByyaMNesrGDh+axxqPlssN58Lak14+o3InAbg/jLEJbP0S0qP4xEgQahR7F6th6aQNKDMPI9UYJVeOPeSKiPBoe1yNe5gQ4RkhIeAIwVwPb4GHO1VuqCj3QfLJstCkFBgPHzW5j63QCO2089IU4qPkSsQLkqbMkguIe8bJhcmOG/cABIdhDSv6MC+EFPN4oWhj4XuL49IG86K2YRcw0M7AQhnCwHrVSNFQ3A/l/XBqFPiAsXGIrBVAP4hisYYBZIyBpVEAVNEn0M7AcMi8W092fXGBLv2shqNGJ+bIZYGzv0V9a0X6opOkjWVgbdDFqPMWAOViV4ov8ncaXzIeKRc+SsZLhmAxiF/lUYcH4fFRbgyM+8hjWSBSP455/YUC9xZtr8i9BUCRN5VHHBaG50U0pJZ6Vu55mTx98I6EbHL48NK0RZrFczBE3o1+zJFxMV7OGRtjS3e08OZT1DwPgGDf0MClsp0AYyCKoGxwrjziPKTGb+c4cs7135O+3Mf9yAxDYW1YZ2SHUf4g35pHZqx53IdRsAExKbnGc6+XA0PtVd80vIo+gXYGRv1DKsdcFncvIAXPv1a+rqw7603EIqNC13gu7xFAX+6XB5AyRPqY17xN4AVYiMjPmQRKFecAgZ9tfLdgpA0MHFEF70QEQ+HxAm+pETbxqDCNMAGiGIuf78IgALwDSPuwIBTHYbwp0ugIEAACit/MsajcG8/CEaCIGFU+D5SlVVrQbWAtWWPWLRQI2cBFQY+aNzNSdKJPoJ2BAe4hogzEj4NxyKks0Nn0HGBc18h1Npx1juHyn0q1MsCOQOqEUSA4IhDRIKIMRhApBcaAseG1+DcGjI17MDJSDyJfRBiEfqZ8HAyTNDMXJGNH+kNopw/1DePPlqckAeqmNDryLOaAcKIvddqORZ9wEKPl4Z15YLB4MeYM+ZuCH8eyNKPYYMQIuXGka1AVCzMwlPb8/OISAvp5mXwOzI+yYnxTD8cJ8uwhjcyVMUqepxMFpsv//SBAeCVCTDA+ZnxEvltFWsc9/D1TjcIXhSZ1wBgjpyUV6Sn+TkE9xr2EbeoACvVpcoOdKE9ZmBOpB+MPkb9sj3xMXnoruUGxybF1ce1GuSNg3BnyjRCQzgMDI5XiIzDzqNEXk+VrkHr9TkC0IJ3FYc6TR8LQjwDyv0vuOJcGCCqRHgcjkARw0jhhjG+xgWLGpkAOhBEF3lA1UgH6koLlqQGRKrX4VbLzFFyPyJb3S2uvAM9iDinolxegEaVS5OMzFkZboxzIihQOJ9vfIPPYN784iIBu98idTJlN1KjRL8D5TVXf+nlZxxh5yVEbV40aNWrUWMbwPxmc11TG60wTAAAAAElFTkSuQmCC>

[image14]: <data:image/png;base64,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>

[image15]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAXCAYAAADduLXGAAAA4UlEQVR4XuXSoYpCQRTG8SMquKigGA0iirDNBzBqsrnR4AtYtBjFKJpsxu2iGOyC0bppk0Fs+wIK6v/cOwMy94p1wQ9+cOfMwJk5XJF/mQhyyLgbbsY444a+sxeaFi6ouRthmeGAvFMPJI0dNkg4e4F84g8Ds9bHVtDAhz1k08YVdcQxwgRrCXmwvW8JQ1TFPxSYThZ7/GAu/pU0eo0ekmbt5XFkZfxiJU8e6o7sW/xO2rGJjqlLClssEDM1PaxrncIURVOXAk7o2gL5whFLU9cxetEPbRe1BRPt+PKHet/cAcfeIy832IBiAAAAAElFTkSuQmCC>

[image16]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAYCAYAAAAPtVbGAAABtElEQVR4Xu2UTyhEURTGP6GI/EnJ38TOShKlJAspiWKllJRiZSOlSE1J2bCTEktZsBMLWbAiOyVkNQuxkhJKEt83592ZO2OmZvbzq19v7n333XPeuecNkCVLlnQpof20PhgX0T7aRnPdohTk0278X5tDy91cId2gC/SJrtIDOhZct2AbJaOU7tI5eksnvXs99JV2atBLF2kzfaHbsMCiPVioNcmYhiVTS8M05N1boY+0ToMJ2kGH6A/iN+yi33TWm3Pk0SVaTUfpJ4KsSQE9CtTvKIochmXlUKa/dMSbS0TB9uglrHyiiT7DjiCKDvoUdgZ6SOiqsUqoUqbClUpJOtREiVWJRp735hphNd1ELLAyrYF1jkNd9UEHvTkF1H7aN4rOQ2UJBWNtskxvaEMwV0Gv6RditRct9A2xIFr/gBTnoS5SXffpOaxUVd6aYnoM28AFFmpvve0d3aH3sIT9qkQePoNFVusqY82li85TgcpoJR1GfKdFSHYe6dIKq4C+LaHkTughYt9ahCnY643DsskEddE7HYBtuk6vEHyAPvrbcOqjygSVao1ewM5zBglvkCVj/gCwO1DERK5Z5gAAAABJRU5ErkJggg==>

[image17]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAYCAYAAACvKj4oAAADZklEQVR4Xu2XTYhOURjHH6HIV77zHVmQ70SULCSxYIGFwlIsrHxGFm9JYiGhCDVZIBELaZAyZbJgp0QhkQghSyn8f3POGfece+/b+87MO7OZX/175z3nzr3nec7z/M99zXrpcfpKG6Tz0kFpaDzd/QyWBqSDnWC7tMxcoIekVmlkZn6Y1D/zvS640SppozTT3EOqMV9qMvfQroBktUgX/fdp0kdpTbhALJYuWx3P7CMtl55IzdJmr/vSK2nR/0sjJkoPpVnphBglPZL+ev2QZkdXmO3zc0EfpDleU/w1JJkAV/rvgS3SOathJ7ngmPTW8oEwRx+wuAXJHEk5KVWS8ZR10k9zAVTiqTZI0mNpRjrh2W8u0exsloHSbWl9Mh5BAGel7+a2vQgy+E06Yy6oALvx0n9Wo2Kup9idF9LYaNZsnnRB6peMA2u6Io1IJzybzCWntFR3SH/8ZxnDpafSc3NlFyCzd6y6uQwy10vsEgliF1lUFlphVzIG9PZRc/cgwDHxdBv052tzhpRjurnaLspqlhDgO2mcHyMogsPCq8EC2B2uXyr9ku6aK68A7ZEukP47Lk0298ytlm8fIPgHVrKOirmMHknGU1jkJ4sD5JPva8NFJeB8e/3fBEVwBEmwQPKuWZxgknHL8uZDFRRxyZyjZtun3Yopz9SdUpjnOhxxiB9bKH22fOZTKhbfn/JkwaGf6W88oKj/aoVWabHEhMIOYB48pBqnLO+ABPjef5YR+m9CZoydoiXYkalW3n/1QIC0ENXQTggwW3ZFTDJ3Dn61+KyrJcBs/2WpmEvYTivuv3ohwDeW+AhuiCtWC5ASOmBuMbuTuVoC5Pzj/1OCuVHi9yx25o5QWKLU/FXpt5VnkDOIA56DPn1bKHp9SqlYcX+TuHBk3LDO9R9gkjgpLRHBmwkBNFk+gBXSF+mExZYeCBXAAV7EaHO7Mzed8IQjo+z/a4Vk4aD4RCGcLRyUvIOG989m6Zm5ICPrzcA4iUlvzGHMvbIWf9ryL+wk7aaVV0+tYCw8j3YohYfjpPx64Fwbb+WBZcHyuXnkXt0MlYAr48hdDj+rWqXV6UQ3wSYc9qplQzoEpXHdivu00eDGmAuvdQ2DzPEqhhqWxQIwRTyg6k+lroKH7ZGWpBMNZJv1XGv00nD+AUEco6cvCwNWAAAAAElFTkSuQmCC>

[image18]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAAAYCAYAAAC2odCOAAAD3UlEQVR4Xu2XS6hNURjHPyHklbzySmTg/cgj8kiSGDDAQDExYiDlHRN7YmCCUIS6MZGIkS4SiihmShTySISQgYHk8f3O2uta6zt773vuPefmqPOrf+fe/a2zz17fa31bpEGDeqWXqru9WOd0VvVTdbKGSuivWqJarRon7mZFTFU1qfpaQx1A4AarulqDOOdsU21J/24VFi1Q3Vc1q9amuqZ6qpr5d2nEcNVN1QRrUAaobqt+p/qimhitENmZ2rzeqCZFK9rHeNVjcfd8Ls5RWeC8M6pV1mBh4X7VCyl3BrYT4jY4zdhw7CFVYq5bVqi+invgJDaVwNF3VWOtoUp6iwvSBVUXYwshcPdUI6zBgxOOqT6rZhmbh5L7pDoqcVpy8yfpZxGJaoO4LCG6NqpTVCeleCPtwT/3Lmsw8LtnJTuAJTaqfqWfedDcHqgeiSshDz9+WYobdk/VKXHZgpPJpjXRClfWW821WrBS3N4WW0MGPAN7ZK8RY1RvJTu6Id5Jr1RD0ms4Bgft8YtyGC0uS1g/R/VddUXVI1hDqc8L/q8Vh1UvVcPS/wkYBxL7tpDN7M+2m1J6Edl95rqFjb6T2El88v9yvyiHZaod6d84BgfhKBwGBOCcFAepPfjA+kznBD6v2iuu/9jf8/sh+1pgrrkllaUjdtbRBGmGMF31XlrPgETi+1NqBMb3N/oGPbEj+xEBIeNpzJx0Waed90fUv7znuBE3LIK0tScTTnqdfubh+5FPd+DhKG+a+ChpWz+aIW6Dm60hA+5LYE+Lm4U4oNB61dxgncc7Kaoq76SwhLLA+8xJHyWehSpxUtiPQhJxTt8kbetHOJPvXZLye1oI7E9xp/ZVcTNg0cDonURQW+CU4rQqchI33S3uwYhGSCVOYj7i+xZ/YFCubCA8MYugp7HZPtZgCOejbuKe4YdqYbDGkllufjbgy3mRZG5iiGSYtGM9WcJGacx5JJLd73C+HwdaG/Tag52PCOQ3cSWIMw6Ke/UK8Y2+rPSZoHFCk5Q7YZHqg+qAxMe1x2ciQ2IWA8VlyWRrSKGZcsrlfb8ayGDu7YMfHjL8Lq9CFuY4+l1WUEtzwTNx72x4GjWrHopzVF4dcx3nUvshg8Tdy7+LoSNS/pKM4y9KfhZXQyLx7MeL93Vx76Fk7sj0egjPQdDDQyaCDZCivPUz9wyVfOeEcJzjkLIp9R9DU6esQtgj2W8rxpOIaz+1Lv1SXd9RLbWG/wz2cUM13xpqBfXPJJvVt/4X1qmOS36WVQ1lyWsHqqRE6w3GEXpwVp+qKURgu2q2NdQ5zFNM2JxsDRp0EH8A/BC9VvdeqnAAAAAASUVORK5CYII=>

[image19]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAxCAYAAABnGvUlAAAHFklEQVR4Xu3daaitUxjA8UeGiAyRIbOkkJCpG0oiFD6Yi2/mUkTCDfeUfJAiQ5IhU8j8AfFBOvHBFYkiChkyJOEThQzrf9d+715n7fc9d+979r53n3P/v3o6513ve8+ebu2nZ631vBGSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSps8WKe5LcVN9osUuKbatByVJkjQ5e6Z4JXIidkYvumyU4pYUu9UnJEmSNDlfpvioOP4mxXXFcemJFN+mOKY+IUmSpMk5KHJ1rUHC9lhxXLo9xfUpTqtPSJIkaXI+THFz5OnOs1P8He0J27W9nyRrXRU4SZIkjRnr1x5KsUnveLsU/6W4evUV2YGRp0NBwnZrcU6SJEkTsmuKr1PsUIyxmWA2xVbFGP6JnMg18WqKzedcIUmSpLE7LMXvkadCGyenuKA4xjYp9i2OWe82G4NJnSRJksaMRGxl9BO2c1N81z+9CrtBWeNW4t+xMaHcqLCYHZriqhRHR94Bu9jxWjYOd/NKkrRkHJ7inhTnpXgnxX7FuWOjPwV6QG/sjhR/9cb4uVlvfDFjAwWtTVjH93x1bjHitewU+bWwPnFd2zRyUj8NpuV5SJK0JLGurlk3R2JI5Y/fP05xZnFdFxKWT2Puuru2eL35B5GniEl25sPU8PJ6cAJIlv+MwSbGJMhNwkz80Pv5feREqcRroXo4Ke9GbvPChpQGSe9lxTGo9p1TjU1CV1Pn+2PwvZEkSWNySuRkpMHts+gBR9uRct1dlysiTws+mOKBKh6JnOSwZq/xVIplxXGNZISKVVvLk3Gbjfza29qn7J/il+i/ByREN6a4ZvUVubI032tZKN6LJ1M8HnMf58ToV7X4vNhRzPvMWslJa9Zk8rP0cgwmvpIkaUzYifpjPRg5Cbi0HuxA0jNTDyZ3Rv9LnOrLishr8o5cfcWgZyInJLMx2Q0Xu0dOVkk+2pJDWqrUCdDpKZ6OnEjxWkiieC0Xlxd1qBOcYZwQ+TmW+DufV2Mg6ayf77jxWXY1dd4nxRfVmCRJGpOvIydtNb6Qh52WZCq13kiBF6KfdF0Yc6dJu9A4mKTuvcj96iaBqhmJR1MtaltTN5vik+KYitZbKQ7uHZevZZjK0igJG+8Z7wFJ4XG93xsk0W8Xx411kbDxeZLo8ljnV+e2TPFGNSZJksbk32hv0EtT37apQr6YazMxmISRFLHJYhQkA9tHTlgmuUOW5IkpXP4+jzM752xG1fHFyNcQH/SO19YoCRt3wmBK+avI08p3F+eoBrZVBNdFwta0oum6CwfPa5hpdEmSpk5ZiVlITAJNeUlMmM4qsRmB6hLruEpM//1WjaFZiN58iXPMTtdRHBU5iQJTjm3rpBpsdmgSqTp2LK7r0twijAoelTyStlr9+DfEaJ8Df798XidVx8R8WNTfVrWcjfZkaU0JW/186pivQTPT2fcWx7Qx6UoaJ1UVlSRpg8VdGJgOrb+s2SRA5Y3EqTQTeSqxHgc7O9kxSjLFjkYWoY+C68sElcdnDVebenNDGXcV17UhoauTYTYXlKjwkbCWd6dopk/bKoxteJzyeb1UHRPzOSLFH/VgrH3Ctm0MPn4Z9Vq5EmsKh7kLB8+Bz1+SJBUOSnHWGoJdhF2Wx2BSNJPi1xjcGEACQqWF6bCuKsrPkZO212K4SleDalJ9PUlBfa/VhaL9xqPVGJWiunLG5oJ6w8WzkZOWtdVVLezCNGhb+5Ouvm9rStgWon4vqMg1fehKTK0Pm9BKkqQhkMjRH62ZDmXKjMa97PQ7pLmoOEfyRAJ4W3RP5zFtRvJT9wibD1/wD9eDkf9OWyVpId6MwV5lK2IwYSNZosLVYF0d11xTjI1qlISNyhUVLKLGc2sb571qq8gtBJ870597VONtd+HgWlqQSJK0ZHDnA5q2UlmiJQTH02wm+hUwEo+u5IMv7UvqQa3S9Z61IVlkrWBd/cTeKT6rB6fAssjVVUmSlgTWR9H+oNxNx50FmoSI8UdjcH3Q+sLaJpqynhp5E8Jzkac8uSeohtdVlSwx5cwavIuivx6wxv8PNniU/3+mAc+JkCRpSaBjfr0+jLVHzfQf1ZW6x5U2DCRsJD3cUYHf58Oaumm5hyfPdZhedJIkLSpbp/go8o6/MyOvPZqJXIW5NnKz1HoRvlQ6PsWV9eB6MsydHiRJWlRYm1QupmfRPwvamXps+p9JkiRpPWFnZt2olqoaDVJZTN7Ve0uSJEnrSNv9Oa+IvGMUtEWg874kSZLWExI2osGi8ZXRX2DOdChNUen7NeqtnSRJkjQmP0W+lyVNa+lav3Nx7vEU76e4PKavbYMkSdIGg+oZVba9YjAp45jzkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiStpf8BCeFEfzHcOzEAAAAASUVORK5CYII=>

[image20]: <data:image/png;base64,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>

[image21]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAABUUlEQVR4Xu2UvyuFYRTHj1CUMhAZDIrBj0VKiT/AZDDdwSYyGGxGV0aFMKFsSjEh/hBlkEUYGPwJfL7OvbfneS7Kfd9F3U996r3nnPftnOfHNfsnDOFuST3nyiiuYCNO4iNORRUZWcUH7MYmPMOjsECJO/z4ozfYip04jg3YglfmSxWxbP6SxjvEg188xmec/nozZsx8Gi1bRC/e4wv2J7kUfeTUvPuQdjzBiSReQWupKYpJPETLsI2zSVwf38RB830YiNNOHz6V1PN3jOA5tgWxZlwz77zHfD8WgnxE0X6eQt3vYSGJz1v1AUgnrFCeQvuhfQlR95fmy1Ez6nLDvAvtSRjfsurua0KnSKdJd0N3RAzjBXaUi7KgbnfMp9D90O91nAuLsqKO38yn0P/LNXZFFRlR1/vmU7ziUpzOB52ad7y1nLsvoykWcSZN1KkT8QnP/0dPT/G3DAAAAABJRU5ErkJggg==>

[image22]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAYCAYAAACWTY9zAAACG0lEQVR4Xu2VMWgUQRSGf1EhkhBDBCUkRhNsogiKmCrptEihhZZqbZMqEBRJERARFSzUSg1JELRRtEmhNqKCYKWdjRglJGBjE5sENf9/b+Z2Z2533TsEm/3gg9l9c7PvZt7MABUNbKan6V16iXaG4f/HeToCS3CKvqU7gh4l6IH9q6440CId9BW9754H6TId8x3KsIlepku0L4p5uulz+ov+caqt36y550+wpdN44iDd49pDsMSOuedSHKE/nWoXoYF/w2Y3zTY6B0v2ZBiqcYG+gM1kKTTgA/qNrsNqogh9QIll/fMTsJmbj94P04ewWS/NKXqDXoQNqsHz2EIf00XaG4ZqKGmNMZ16d4hepe2wxHamYrmo0xO6G8mgZ4IeIUpmkS7QtjCEvfQz/YikTlVf12k/bHOdo0ddrJBJeta1/TIowTy0zFrua7APeTXrX+htJGeVEn+KZKPIos1V5wCstnwx+sSu1Hs04utLH9Sh6X1Dn9H9SdfW2Erv0NHUOz8bceF6iupL483Cjo2sTVGa4wjPo7RZ9SOK6kv4GfcHatNsp4/ovui9auUr7LTOOmvyzi/POCyxW3GgLBOwOyzGJ6adtSuKiaLzS/ffe/qDHo5if0XXhOroA2z7xmgm38GSU5JptHRawqxdNUBfw+pLu7MpVOT6N76OVhDuoJtI7jup9gwswZdR7DvslpCrzntoTLiioqLiX7EBauh6pnAsUTAAAAAASUVORK5CYII=>

[image23]: <data:image/png;base64,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>

[image24]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAmCAYAAAB5yccGAAAB3klEQVR4Xu3cwauMURgG8FehRJGdvaWikJUlO1IslKX/ASlLC3d5k4UkFmJhwUIpFndp4a+QsrS6C8rlPZ0xc+bMNbc7rpo+v189Te85p2mWT9+ZmQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYOJ+5ucW+To+vXxWMg8z+/oNAIChOBa1kL2IWnz6fIxa6pbR5cyJzIHMu8zB6W0AgOE4mfkQmxeeB5nd/eISuJZZb+ZnmbVmBgAYlFLIytXn1W69XDOWMrcd5b2uZK5nDo3W+nknrMZ0YXua+dLMAACD8zyz0cylrL1s5u24GbUAHvnD3Dqc+bRF7oxPT6zFbGFrZwCAwTmb+Rb1+2DFucyT8e6s15lXMTnf6gtaP++E96GwAQD/oVLS3kZ9uvY4s2d6e8rxzNF+caQvaP3c2hV1fV42u0q9G7OF7XMzAwAMUilq5Vr0YtTytqi+oN3u5lYpheU7bvNyZnx6onzGH838ZhQAgMErT9jaIrSI/ZlHme9Rfwjwu8CVXGjO/a1TmRtRS929mP9EEABgME5nbvWLCyp/E1JK1N7R679wPnOpXwQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfgENS1Q+3jWFyAAAAABJRU5ErkJggg==>

[image25]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAZCAYAAAAFbs/PAAAAi0lEQVR4XmNgGAVDFkgDcQgUNwKxJ1RcCIj9sYgzuADxKyD+D8XlUHFdIL6FRRwMJIH4IRYJXOI4JXCJ45TAJY5TApc4Tglc4jglZID4CRZxBn4gPgGVqIKKMQNxJVQMhKcBsRhUDgycgPgpVBIULy+BuIEBYRAIH4CqRQGsDBAbQYARiLmR5EYmAADMrjUHzSVsDwAAAABJRU5ErkJggg==>

[image26]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAAyklEQVR4XmNgGAW0BPxA7AbEdkDMiiYHBiDBUiA+DMTRQDwJiHczQDTCASMQlwHxASQJSSB+CMQ5UD4YGAPxOyD2QBKDKVyIJMbQCsQPgFgaScwGiH8D8RyYAA8DxMo1QMwCEwSCdCD+D8QRMAFNIH4LxOUwASDgBOIdQHwKiIVhgn4MEJ3ICsOB+CUQmyGJgYPhGQPE6tVAvAWIjwOxFrIiZPeBwhFkjQCyAhjA5j6sAOS+nwyQoMALQCZdZEDyGS4AijpmdEHaAwAIfCCyuF6yGgAAAABJRU5ErkJggg==>

[image27]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAYCAYAAAAs7gcTAAAAq0lEQVR4Xu3PMQuBQRzH8b9QRD02A5MyeA14Ac8i2WzehWxegsw2g0UZrUZ2ZVKU1WKTxffwuP89PZsy3a8+dfe76/qfiM8/U0IdXVRiZwU0kTWbHEY444GWvffKGEeUdTnFSdyXA2yxQCYqi9hgqUvSww1t1UkDVwxVV8UBE6RULx3cxc6bxwxreY/iRM9rfj//MGsn0bwrhNihj7S6800NF+wxkITXfH7OE6uhGRvQGcr/AAAAAElFTkSuQmCC>

[image28]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAYCAYAAADKx8xXAAAAp0lEQVR4XmNgGAV4gS8Q/ycBe0K0MTBwALEkELsD8Teo5HEgVoGK6wBxGhDfgcpFQ7QhgDEQf2WASB4AYh4UWQYGBSC+C8TlaOI4NQogsScB8UIoGw6waWQB4jUMCFtAztwDxNxQPhigaxQCYkcgfs+AxXnIAFkjOiZaIyxUfRhItPEAA3Y/YgXYNIKAORBrQtlYAS6NOAGhlAOSxwoIpVWQ/CigCwAAbrFE9L3irjoAAAAASUVORK5CYII=>

[image29]: <data:image/png;base64,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>

[image30]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAAAYCAYAAABUfcv3AAACc0lEQVR4Xu2XT0hVQRjFT1RQZkYllYuIpE1kK4OoNFoWkkK0KAjcRYS0CKrtE2lbUdGiFtLCRaG0qCh3htDGlv1ZRERRQkW0qaXUOe97T+aNM9ereV/wmh/8QL+5zzv33M+ZeUAikUgkEgE20zf09wJ9SlejcVlG99Lr9BbtoctrriADsDA+0jv0dobD9DM9XP5kY6LQLtJndDvdSEdgz7/SuQ5b6Vs6TXe4AwE66T00drfpGb/QLqfWTj8g0DCXYF1X8uouehNX6TF/oMG4DAupzamtpZOw/zjlMIta8lNF/Ryig47RZn9gEahjj9Dj9Cy9QFfRFfRQoF4vdK/HmBucnnmCTtH1Tr1MCfGuU8o36Al/YJFsos/pDOyeE7DJrYEtBX69XlQDigXn18tUu07rndY9F3XbI7rOq/8tdxEOKFb3OQnb1PL6AtnruEJROH5AmcGpq4ZgE9aa59avIH+37aHv6Dl/IEAsoFi9aHQ809z9gDKDE3ob2l11ttMfEbvoQ9i2nIfzsId+gPnXp1hAsXrRxAKK1WdRd12DTXqg8vsgPeVeNA9a+A/SFn8gQCygWN1HL0YPklc1Q81ZzEOb0yjmBlQNTjurdtgg6rBvsK47QJ/AFvMiCAWkl6UDp18PsQ22A+e1j24ofzKOlqnvdKdTa6WvYN8komjiN2ET/0rP1A4vKSXYfdw3uZ/+qNRf0t3I7pKlRsuVNkl3Te+GZbHPqQXpgE1eEy+q28QWOg4L6Sdscvdhb1Y1+Qt2mq8nOuS/p6dpP30NO1eqqTLRBfpQrz9QELqfDpbVL9JNzs//Cm2GRyvm3RgTiUQi8b/yB/vHo4znlKjqAAAAAElFTkSuQmCC>

[image31]: <data:image/png;base64,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GtK2arBln/chwCTzbMVguypqOJRtADm2tws8W4T3F4F+N+t/DKULouor64ae+rbQZjyPeOH6vk1yrqWRnqxisM0z6PHqPXxMbNBPkzFRREQ2wuKOJyIf8udGXTyTftHn4fqw9v24It9o31lYz4paRoZP0piDSdQHOcbe1VEXfx7iFxV5VJG3RTWorilyz//kmG4c5jz1yfqxR+vImIYzMxRIPXsjgO/UF2gj+7ByjwpeOhbALCPpy2DRYvFi0ceQeEVetE2gj8dEXQjZt4NhxzH1yeNlORD1BxLAwp1GWN936I+QKPuPkt5gwzhG/wn9ywIO9CmeEK5lP9eqzDPYKC/3CQFjAV3frh3T/9T57TFrVONlyj5KwyzhumxfjuuxzzMkinELvcEGP4rpCwJGcL+fCp1cGxv3Qm0HhKMJtVL2nuHcwWAeMifgjJg12E5o3/lEP5xLveZcY04zf3Ou7WvplInkXM12PzNmQ+uQ42tV9sesYc3L0Wi4i4hIA8OFP5okJIEXBSOCBe60qB4xjnl7vyzqw5Xr2OOR4R0MNn4Oz36yq6P+oeXRRe4TdQEkPxvs2Z9DKBVjjmsIL5H+oqhwb8J+nHtNS4OToy7E3DfDsCzclIucGdN6cj8W+zzHPYFFjfv2Yaksg7aNZcCDou7VoW2rLqIHI70WKSyu4/GysBmc9tE2NvOzeI59R0gty8a4u7x9vy4qabgklMHij84vjfofV5fE5n+qOw9+QJH3JVx3atQ+55jPBOON/sdIRN/pbcJYeFNUfZBO+3rd4C06P2rIG0OLcrPPj42NfU57ez30dSEfedAl7cao7KEuuWdyuyEkSEiYebgqV0Sdj/TzF7t09MTY+HhUvTLGE4xR0shDW9MYOznqfsLs9wRDiv2j6BIPOfOC++YPZHjhyhe4VeC+eC0pl/49MHtaRERG8m0aLxhemnncpH3ykO5/UYXBhrAIHMwzhCHAfTJ/bmROuP+8sAp5Vv315Ah1W9S2RVC/sY7rRnqqaNuh1HV/bAyH9X2NR6vv951gUf/jLeTcJDYas7SbPPRvepqSrfQ5zNMlBhv713YC7oWux3suA3nol3HuoSf0hm7m7R8j3zzdMEfHOQ6Uw/Wkj3PxxJj+kGMrZP+KiMgOwQJ5epNxsZTdB96TDKmtGyzohG0Jz23FsNkK3PPiqB5KvED3nz29lqAbth2gp+NjvgG83eCN3DMmiojI+kCYhYUM6UMusjt5V8z+L9k6QTg8x9re2VM7CvclPEi4cDewN+qWhtTVol+mbhcYiLmXVERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERGQx/wbLQ1nvqMitkAAAAABJRU5ErkJggg==>

[image32]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAnCAYAAACylRSjAAAEmElEQVR4Xu3dXahUVRjG8Vcqs0xSKyu0EkxEiEpKQzCYi+wDzaAyENQLP+qmIhCUuumqm7oQEVIiM4QIIlCQPiCRA912oSAlQRdFJBokhF1YlL0P717NmjUzZ2bO2TOcjv8fPJzZe49n1tnnwH5Ya89oBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgGF7zXON5yfPmuIYAAAApoAfPLd7PvW8XxwDAADTzDrPu57nPTcUxzA6Ovd/e9aWB3pQcVtR7gQAANPHdZ43PUs8f3jOtB7GCKmoXfEcLw9ktnluybZv9qzOtgEAwDS0x5rLaYs8P1sss13NHvLsL3cOmcraEc/LFqVNRbqUfj+JirbK2irPzmw/AADoQctaWlpUHvFcm20vzJ43VTzsebF6fKfnx+rrcmuO+xmLsaftRvX8YUmv85S1n89R6Lew3eV5yfOeZ7dnRuvhgXzgedSiLH9n7bNmN3k2ev6yeI4KnYpdyrPNpwIAgH5omepElburr9o3TN9YvFtwvPRy2HOx2Kd7qpTnLJZMR0HFRwVIY1FJ+81iFmlU+i1sKkq/V4/v8/zjeax5uG8q9SpriYrgZWsvbZ9VAQAANbnH4oKuGRE9nqytnlnlzpqds/bCoeKkn0OlTY8Hpdkgzdh1ygKLj6XoJM0gpbI4Wbr3a265s6KCqPvC0rie8BzKtpVO5/51i6VIHXvAYrxaYi6prB+zmCXrRMWsfLOHvpeWqlXmEi2HvpVtAwCAGmiGSBfeQSy1KAjJMoub0Mes+wW/DprBWlnutChOWvI77bmtONYP/dtu2edZ/N8z22lmUufv+vLAAFTEPvZ8a63nNafi+I41x3XUczbbVrQ8W9K7a7/0XPL8Yt0Lm8rceYvfZUmF7MNyp0U504ymZvuSP629UAMAgElQAdpkcbH/3pqzbCo9r3ju93xkcSN5rmGtF+lkzMYvbCoP6V6vbulGn+OVxnerZ052TONXcUrlM92n9bTnE88OzxfZ/rpoVkqvrXOYz7Kp4By0KLZveB6v9vdyyroXtlI/S6L6XjofGkO+3amwjUcfp/JkudPda1EC0xK1ZvH0e5jtedva/24AAMAANCOlGRWVNJWL+RYX8pMWS3Kbq2MqILq4lxf4hk2ssE3UHRb3iKX73C5YjFtjVQnRPt2ftcXiHi2NX8uc2y3Kin6+tGxYBxU/lREtSep1tK3zp+KimTCdGxXdAxbLiOMtNebqLmwqlBrXYYtlXS2PanuvtX7sRi+/WhSz8n5DzbCpqKaSrCKdlkP1PxzUXZABAEAhXXjHLN6NmWvYaAvbROldo19Xj/VRFKP0lWeeRWnRuzT7UXdhS7rdgzcMKtHd7sMDAAA10uzVhuqxlhQf9LzQPPy/KWxrPJ9bjElfX7WYBRoFzWqprKk0avZvV+vhjgYpbHre+nInAAC4euRLWTda+wxNwzoXtqlmpjU/3LX8GYYtfz2NAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFPZv3OuuWwNqYP+AAAAAElFTkSuQmCC>

[image33]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAYCAYAAAABHCipAAADfklEQVR4Xu2YW6hNQRjH/3LJNXeSW8SDECUil9xyeUDhQaEU4sEljktInRfljTxIohMPro9CLnFEKZ6IknggEYoX3tz+/76Z9tqz99l79tlrn7PV+tevtfZ8s9eamW/mm28WkClTpkz/jXqSrmFhpqrUkfQlHUJDS5pMmkjv0JCpKskBDWSXuy+pYeQ+GR8aMqWizuQ8WRUakpKXjpPGoDxTuppAHpPhocFLFV65a6baqRO5iBITfj+5jmyTbgutJU9hm3eeNPhywsGgvB9ZQVYnGEe6kaWJMtVR3XqQ2pdsr2/b0KB8Lmx2tocmkXdkamgY4gzLgvKJ5Dn5Qf46dpBB5IX7/cXVUd160FbygfyGte8brOOLXJmQ/RLp4f7T1vLjvTI0TCGfyazQ4DSSvIZ17DQZ637rXplAPUqZiR943Yuf7tre0jmtGbYd5EmOeO+uLWka+Q5zxi9yF+mdNZSx9YfNlBhi9jE9cx+svX9gDtHvsjl8FdKhTSFbZ7FS8o44EpRHOULys0yOWBDYqlEfchS2wmJQZ2Ok1ar6csYzMjDfnKq0v15D8RAfyjviTFAe5YjkDBMKTQpZ9SytWK1c3+Zah1I/wLGOKAhNo8lHlJ5pWg2fYJue71wYnkaRC7CsZCa5DDskphXCKpFfDWqj2uzDahieNGhXYF8TNpGbZENQJ1axjlDaqvR1d2gYQF6SLUG5YrFi8nzylWyGNVCbtVaQOnYW9mmkF9kO6/QbMgOmcyjfsDSlMKc2H4K10R9Q1yO3V6wjg2EreiMsrNyCpbn6b7O7VqpYR2i83pKFoUGD20ROBOV6oF/Wohn2MoUwZSBJ2wGYg+RMPUvPVN3bKPLCGkqOT7bLL39dk+Vq/zwyAhbbl7t66tsj2OSU5qBwj/KchJ1bvGIdoexUE19nmwKtIU9Q5LRXgbxDdXKUNBsfINepepQG4yEsPEvbUDghYxXriEbYZ46iB0qlj5oJS0JDBZIT7yC36WsWKkVThqWZVY/S7LwBG0Sh+9mwg2ulEyjGERrne7B3tCgtz6uwTxitkU6w6ojfnBvIMbITtc1WqpE2zEZ3r4HUTD1MFvsKkVKio0/cCnn6uroXxc872p9Oocx4KLToAaI1WYMONN2DMn1GaM2z2kpdkD8oxfqQlsbAsjIlCWWlRu0h00NDpqqkrFJhWhlTpnrVPxydtqNK81q7AAAAAElFTkSuQmCC>

[image34]: <data:image/png;base64,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>

[image35]: <data:image/png;base64,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>

[image36]: <data:image/png;base64,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>

[image37]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAXCAYAAABOHMIhAAADHklEQVR4Xu2YS6hNURzGP6GI6xF1E8WVyERKSCEDAxIJSSgjlIkyoJQMJJEUeZRnBvIcepWB50AZGaCUPPKIYoQBhe/ba6971t5n/+9Z+9hF3f3Vr3P32mv/9/p/ez0vUKtWrVq1yqgvWUnG5cq9BpLV5DjZRyZlb0drCNkMF2cHGZW9nagPmUkOkaNkEVz78oqJVblkxGJykLwj38i0TA2noeQW2UUGk6nkKVkeVorQWPKYrCcDyELynMwI6siwreQu6SIjyDk4Y/oH9WJiJdJNUZVkml42j+yEbdo28ogMD8rWkGekMyjrSf3ISXIl/dtrN7kJ1xZJ7/9IZnfXAMaT12RBeh0bK5Ee1hffC/cFqpSMKTJNRsmws7ny6eQrWZIrt6S2f4B7T6hlyL5XicugcKh1kPvkDFxPjI3VLT00hdwgp+C6cBWyTJtMPqPZNNVTfSUZo/nkF5oT1fTwG67nahRdQ7NpmhLuoNHbY2KZ0mR8OaXdidnLMs2bY5mWL7fkE7ISVbk3xzLNl8fEain1NvW6e3CrjnpjWVmm+YbkzSlrmuIXJRQmKkNkTCvTYmJFSwGPoD3zLNO0UFRh2hYUJxQm2kleoLVpMbFKSQvEMfIA9p6rSJZpljlWuSUroX82PCUFO0xuo3wvkyzT/EqVN8ebtj1XbklbiJ9oTsgnqpVP2wdtIyzTtIJ2IC5Wj+oiJ8hVuFW1rFlelmm+wVrVwj2iVrAf6a/XsJQijSav4Hb5oTbCrc5apSW1I7yWRpInaDwbGysjGVP1tkON/Q63/8prLXmDxnv0fp0OHsKdFiSt3tqUvg3qhSp6Rjv8S+Q8GpvUCXAxVqXX0hzyicxKr2NjJVJlDT0NQQ3Fvz1rDSIXyBe4bu15Tw4E9dQgzZN671K4BuvL6zjlNQbuWKP9k4ZJkZTgdXIRboE5DTf36tlQGl4vyQayDu7ItgnZURQbK7m5B9WfBmKkBk8kK8hcZM+BoXQWVDst6eCtKUBx9Ft0EJeUo8wXVr6xsf5raVjsR/HwrGVIB2qdi9tdjHqd1Mv0/zg/Mdeq1Uv0B/TJ1bfdW0a9AAAAAElFTkSuQmCC>

[image38]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAXCAYAAAC4VUe5AAACV0lEQVR4Xu2YwUtVQRjFv4cFhkaEkkhuijZSC0G0gsKtIbVoJbhoZ+BKpBJc6cKlIAUtWtQqWug2FyKoKBG5VtyIFCEU9C9U57y585j33fme9+njXkV/cLiPM/POZcaZb+Ypcs7ZphVq1uYp4iJ0RZu16IE+SJ1fOmFw0PPQU90QowtahW4rvwTdhV5Db6EhqKmqRzbyzGmDlqB+5VfBIM7OdMR/Ba1DN8SFfYTeiZvRrBSRMwgti9uuUe5Au8kzpBf6BT0IvJvQd3GhWSkih1v0CzSs/AqT0GdJF7BZcYGdgXcZ2hC39znzWSgqh/0XoQvKLw+UA54yfP0SLpc1aAu6GvgWReY8Etef9aoKBrDhsfJ9mPUS7VtY/S3fwupv+YTb4SfUp/zoPiF+MnRYrZfEKDLH+oOWB/0jeYZ0QHuSDqv1khhF5vhBjyjfHLQVZvkWVn/Lt7D6Wz7xg55QvjloVrxFSYf5l7BisnIeRpE5ftCp5c1z7kBcpdPwKPsDdQdeO7Qt7kbk4cXgWvKMkXeOxxyb/9Jz3QBuiat+4QH/EPoN3Q+8OeifpG90nrxzPKzarAPhJJUpiTvYYzNFeHHfh0ahZ9AONCbVF4Fx6C+0Im65xcgzx8MCtiZGFmfum6QPdw/vuNwXFD/H4Ip5A7XohoA8c1gDPom9aspf3JT0/bUeuLz4Y+C4NCqHW+Fr8jR5Ai1Al3RDBrh83kv6Z2m9NCqHS31G3OTFln0FNr5MVLNjBBaKAW0egUblsLjxeMv0zxAeFS+ge7rhFHFd3K+rTAM+E/wHiIG0R1HzAgIAAAAASUVORK5CYII=>

[image39]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAYCAYAAACvKj4oAAACvElEQVR4Xu2WSchOYRiGb6FknqVIyLQxRsmw8gtJoqTIRmaykJQsRBYWMiUSGYoiRUkJ8YdY2BpKWZANSwsbC+7L8779738cbL+/zl1XX+90zvO8z3A+qVGjRo0aNWrU3cwyC03PytqAmrkuJYw/Yfabp+ZYsTbJfDFri7kupzZzwPQ37eaGIqJonfluZqdxl9Q2M83MVThTRuuUeWOGFnOtqt7qCEytDprPZmwaDzKvzDXTLc21qugT9xV9pFZ9Fel5y/RIc0T1m9mSxq0sbH2mf2TaSPPR7CvmqL8fZn4xN94cN3fMSjPEnDaHFM2KSJPiUxQXtdmcM/PMebNd8a6TZrdZZa4rygORYsvM5cQoM0yxf5eZai4osoq1XmaveWA+pX2jVaMR5oM6HCTkj9S5/uYoHBtsNioeipEzzQszJu19onBwhlmuMOaw2ZT24fQC89YsNrcV5cEFnVEYzEXR2DizPu1/b1anNewsg0Gv+GemcWiPogYvKmrvp7mU1nAY41ak/aT0QDMhzd1URAyj7pl+ZriZaJ4raoPb5hxnliguiHH+zi4yX81WReMjUkSpuh97sCs7RK94rP90el6eDSCapAz1lzsqBnLj49I4K7+MdEa8lNvM4txDhRGluP0jNXNEE2erKvdjX7siSxC/ZM1f649beqdIyT6KSJw1rxVRQBQxEaQeEI6RmkTxruL2mCMdcZYUxikcJhKluEjOLK3Ms/dKMSaykxX2kCE5e3LGTDdrFO/jvVwMNc65TsJ4/q3sVDyMuiLfeUAWh/O/HR5IYyE6OEXNsEaKkyo0lQ1x7Hdjqf4LIgLceP4cZWEY5UGK7jBHFfVe3Y+DVxVR5UybIkuwjbr/QxiPcS8TPJh/NXUihaGqXEc4TP3l72bdx5c1MqVOrNGZiXI5V91ffS7rdandqFGr6xfguXWSaTkh1QAAAABJRU5ErkJggg==>

[image40]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAYCAYAAABqWKS5AAACoElEQVR4Xu2WS6hOURiGX7nkLpdcikRJbiG3SMqAkjJgoiRl4tKRIikMThlRhAhFSlEkBi4JuYcYKZdSCimZGpgY8D59a5+99j4cs+PX+d96cvb6117ru7xrbVJTTTXVVFNdQd3NLLPI9Kz9Nug3Yw0jAjtkdpmH5kD220Tz1azOxhpKS8weM9DcNxcUnUBrzHczJz03nDaZ6Wa+ItC8ykfMazMsPZNU3/LnThX7FkVtp1bz2YxLz4PNC3POdEtjJHYm/d2Z4tzdVJzLduqvsMwl0yON0Y1vZkN6Rqdqz50lYnmk0gEVjTIfzc5sDL//MAvNDEXFv5irZl2aQxtXmctmrVmgSJ7unVd0ar05a8and9Bkc9IcNUvNkDROHLvNNcUefcwOc8t8MofNmDS3TSPMe5XB06Y7qvp9krmXPRPkMdOisBW3FZ3j9tqiCOqNmWdeqjxLcxXJssdU81ax9mzzwIxVrLdXERfi7P2x40zervD8aYXXfyqqXfidTuT+54A/V3WDbYqkJig24326w/nh38KerIXoKgGPNNfNRUWSBxUdYy/evasObrzeCRYnGALD7/WbJ8+eLhXJ8N4NRTCIMQIvgiyEd98pKo1Yj3WxC11anMZz1Tte0WhF67BJP0XljptXZniak2c/0yxXBF/YjPY/UyRNwmzEASPYXPj+iSJY7HVFkSDzH6t6m0xRFKXoOPM3K+zWJjbgK4p3CXyrojoc0kIcHD5erQprsNA0hcc3mhOK5PcrKsWadKKykaIj7MNaHOgPKruwUlE0kucrvyzN5yN6W3GmKFxFBILfnyb2Kb62deHZAR2MsU6vbPxvHzO6SDfpaiGsO1TluSqEI/7p/68IDJtwExEI3aJo/4Wo5grFFQhcofUKdx39Al+CcJtmR/e2AAAAAElFTkSuQmCC>

[image41]: <data:image/png;base64,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>

[image42]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAYCAYAAAA20uedAAAAjUlEQVR4XmNgGOQgCYh3A7EwugQHEG+FYhAbBcgA8RMgbkUW5AFiSSAOBeLfQBwBxOJAzAqSjAfiWUB8H4h/AvFSIJ4ExMogSRAg3T4YcAHiX1AaA1QB8XMgVkKXgNm3B4i5GSCu7GKAWMUgAsRXGRD2BQFxARAzgjggohGI7wDxSigb7EdkIADFQxQAAFlmF1Xx4IiWAAAAAElFTkSuQmCC>

[image43]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAXCAYAAAAC9s/ZAAAA4ElEQVR4Xu2SoQoCQRRFr1EQDIImg2DTv7CYTYJmMdhtgj/gl4gIIhg3ilmwGy12g3ov4+rO7K47JkE8cMLOm5l3Z2aBnyZHB7TlFnxp0jPd07JTy0TdZ/RKb3Rol7Np0BXtwWyyoyVrxhvC7n2apxuYFPr2ok4XeHVsw6TY0mI4KQ11n8LuVqABTIpuZDyRGp0jft4OPFNMkHzjWqTF2kSbJaLua6S/ueLrGAHMsWKM6cgdjBBNoYu1qNIlrbgFB12uUuhp9cRP1PlCjxmeYDawUqjr4VH4RP2pVoo/3+IOesg6KAjW3HsAAAAASUVORK5CYII=>

[image44]: <data:image/png;base64,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>

[image45]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAABoUlEQVR4Xu2UPyiFURjGH6GIQoqERDZKMlmkGEgGJsWmMLAppYjByGphlEVSUjLdjcxCJkkpixIG5c/z3Peee8/3uZIcE0/96vve93Te85zzngP86xeUQ8ZIVzwRWs3kjpyQilgumORmhbySNzIRTYdTE9klw7Bix6Q8MiKAnJsRUkj2Ya70H1SNZBsZBz0wV0ekxA2KKZ90kDaS68W16LJYLJ1YRHT1xSQBczXkxZ1UfINMk1My6uU6YQ3V7sWSqidb+Hgeg/jc1TjsLKvJJVnwckvkmtR4saTmkb3DNLmKqJiKOuWROVIFc/uEzOoLyF4KfaclNwp+dmc0kbYvAdtOXyq4iajjBnJDZt0gpxkyGQ968l2pQXy5bdNWOfWSF9LtxVBLdkilH8wiNYlcqeXV+k7qtkfS78VUVI7kLC05eSZXX3ALKxR31ULukSlURy4QOx+5OINN8B30cjhXukersHnWyXlqjI4jqIpgxUphzTSAaAcGUSvsUq6l/tWRB4g6DiJ11wPpg02sd1KP8IdL+lNp25bJIaz9pxDYyR/XO7prYQanpiDqAAAAAElFTkSuQmCC>

[image46]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAmCAYAAAB5yccGAAAFJ0lEQVR4Xu3cS6jtYxjH8Ucocr/kknDoRMqtXHLPAGXAQIoiZeCSMnBLLrENlEtKcihEkgxcJjIggx1CGJi4TNQhkYQMyCWX5+t939a73rP3OTnW3qd1fD/1tNb/stb//197sH89z3+tCEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSpP+ZvbLOydqhLu/WbWPd9t3ySro1a/dx5WbinPcdV66SE7KuG1euon2ydh5XSpKk+cQ/9ddiEsjWZn2VtU1d3iXrzazt6vJKOi7rp/o4C3dnfTmuXCW/ZP2VteO4YZV8nXXouFKSJM2ni7M+6pYJas92y0dkfdctrxSCzTNZv2edNmzbXK/UWm1cy0VZn2SdPmxbDXREF8MOmyRJW43FrD9i0lHD0d3zh7LW1+c7RRmbjs7LOqNb5nnfJaNLh2OidPCW8mLWgVG6Upd068+t6+kAHh9Ljzg598OijHV7v2WdNawjzHC+476zwnk+WZ9zrr9mnTzZ/I9to3w+/Zi5H0E3dDUZEfd/GxCiDx7W9bjm8+tzjjOrACxJkraQhSghiXDzQmw4wns/Spfq2Kzns+6MSWgiJL0bpUt3W5TXEjxuzPq47oPPoryGTh3vt5RL6yPncnN9ToforihjzZezrsz6MaZD2JqsN7Iez3o96/Nu2zgWJHx+mHVZ1lvd+lmio9YCG7ie52J6pPxglCD2QF0+POubyeYphLqbYhLaCGub6hoyCmY//hZ3ZL09vVmSJM2rk7Iey/ozpgMRy09HCQ7U5XU94YwgdUiUMLaubidsEeB+rvsRmAgn4EZ8wkuP1zzcLTMS5Xi4IuuCuq4h9F1fnxNifsg6si7TmeuPS3Bpro5yXiCwvdRtmyWurw+9C1FC2xPdOjqNdN3a+RAk+7H0iM/o/ihBbWOdNXDdBFU+0/2yTo3J30ySJM2hsZsGwgUjw4Zx6fdRxpz9aI7QQVfui6z7YnoESmih8wbCXwuAPI7fnDw7yjE4bqu+gzSGGUaMbcRHWGTf9s1WQlHbtz8uo1y6b3yZ4tOsC2Ppa/+v6KJxPT3OkWDLlyl6C1G2ga5jf9/gUhgH3x4bjkdHXDOfJx3Oa4ZtkiRpDrXRY0MYWIzJzeqM1do+BA46WGzj/i+6ZX2wA/dmgX3pjIFuWXs/wtd4r9ZVwzIjTUaoTd9RI+AsRAlbnAMhsR0HHJf3I8AR5Ph5kHti8k3XXn//WHNUlDC3sVou6BHWHhlXVmujhMXWCdw/pke3m/qixatROmucMyNORqTL4boXo3zmPHJe13bbJUnSHOEfOfesrenWnZJ1YrfMjestSHCPFc/bDfQEr37kSIBrN/ITsgh3LL+XtUdd33+ZgHDI+x3UrcM7sXyYISBynNbF4rfGWqDcM8o4lO2MaAl9BKR1dftCTM6DfZ+qz2eFY30bpeM4Fh02ul6MKbnudn7gc6QruHddHnHvYD8GbaFtuU7b+ih/lxbYeH+CsiRJmkOElgOidKPOjDJyG7tObdQIumeEin4f1hGaWmetx2vb69lnc38Md/xpCs5hqeMRxghhLcjwOL6Wc6C7taW1z4bg1t/LNgt8Dn2YGz8DSZKkVcN9abd0y7MOPiuJ32fjnjq6nI9GCbSSJElbHUZ9jDu5N+2DKN/8nBc3RBn93pu167BNkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ/9bf8/G8qYz/nUQAAAAASUVORK5CYII=>

[image47]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAXCAYAAADduLXGAAAA4UlEQVR4XuXSoYpCQRTG8SMquKigGA0iirDNBzBqsrnR4AtYtBjFKJpsxu2iGOyC0bppk0Fs+wIK6v/cOwMy94p1wQ9+cOfMwJk5XJF/mQhyyLgbbsY444a+sxeaFi6ouRthmeGAvFMPJI0dNkg4e4F84g8Ds9bHVtDAhz1k08YVdcQxwgRrCXmwvW8JQ1TFPxSYThZ7/GAu/pU0eo0ekmbt5XFkZfxiJU8e6o7sW/xO2rGJjqlLClssEDM1PaxrncIURVOXAk7o2gL5whFLU9cxetEPbRe1BRPt+PKHet/cAcfeIy832IBiAAAAAElFTkSuQmCC>

[image48]: <data:image/png;base64,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>

[image49]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAAXCAYAAAC1Szf+AAACU0lEQVR4Xu2WTUhUURTHT6RgpGYkhbhoisikIMEPdOMqhIpCylW1kwShRYqm6EZQFxoGudB058KVqxYKkZirCmprQe1a1CqiMBdCH/+/5z7mvfPmw3EmaYb3gx8zc+598+653yIRERH5yiF4C87DSVgTLC4cjsDncBSWwjr4Dt70VyoUBuAbeNQXuw3fwxO+WN7DBJnogok3wk143cSzoQJ2wSJbsF/Uwq8STrYe/oTjJp4N3BeewGpbsAsOwBhsh02wJFAah0uyzcnvAbykkiVr49lyA/bYYBqK4Sz8AT/DP3AL3oMHXR125EPRgZuAnfAFvOrKd7gm+rBN6l8ly4azMZdsQQp64aDEE4uJLj22ewQeFj1FFmG5q0P4rjF43gtclr0ny6l1DFZl6Dm4Ah+IjkgquKfMSHhKnoQf4C+4Jnqa2DrkAuzzfiRLKlncz3HRqcNezdSX8Du8K/ERS8RF+NgGHVy73+BveMWUebBz2Vk7a/w0/CLhpLxkh0w8F3DdMmH/lEsGN9ApG3RwZs2JzkyOMkfbwmQfiTsBeIlYh8sS3OG4prbdZy45I9qxiaZcIlhv2n1aeOnh5eeZaMKrEq7Hjh32B+7AT/CU+80e423qtYQfzgb+L6+iLbYgDWzwfdHnCT95/n+EDaJtXBJN+KloHqzTLNoRgRH3tnZu1TzHmOiG6LUxl1SKvoezKRPY8G74VnTH5cC8gmd9dbjR9YseSUya8gaYMAf+IR/ugK2iHZBruBGV2WAGsE28vqbqLL6DGydPCW8mRERERPzf/AVIcWtKoLfcKgAAAABJRU5ErkJggg==>

[image50]: <data:image/png;base64,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>

[image51]: <data:image/png;base64,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>

[image52]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAXCAYAAACcTMh5AAAC9ElEQVR4Xu2XS6hNURyH/0IRkQy880ikKOVRJAOhJBIGwkhJSYm6lFJKBpSSiZJHBhKZkiLuwEAMRKEYeCQyMGOAPH7fXWex9tpnnbvXPcdlsL/6Ouf896Ozfnvt9TCrqampqYGhcrM8LY/JmcXDLRkhd5u79qAcVzz83zBFboqLvUAO5EHbyIecSoyUN+VhOVzOlU/lhvCkBJPlI7ldDpGr5HO5MDzpHzJL7pS35Xd5oXi4JbSfHMiDXMiHnMirwH75QI4KalvkMzkmqMUMkmfk1cZ3zxF5wxJPq58hwHVysXxr1QOcJF+Yy8FDPuS0K6j9LsY3XiA/ybVRPWSafG/uAYSsl5/lvKjeDtxrRVzMgGHltZXbmYLg4jYMkBdlt7ke2QNP6KOVb8yF3IDelGK5/GHlANfIn1Z8eu0yWx4314i+kBvgSSsHCFxPp6Hz9OCDim+cqof4oFIBxvV2YIggwLhBVckNkPNSARbqvrHxjasESEDNgvobAQITFmPu2PhABXIC5PXstooBMmv2NcC91jyoKgEONjdB0bAcV8t7cpnlvc45AQ6Tt6xigKmgUvWQVFCpegizImurXM/Kd/KhlRvXipwAoRRUqu5n0vjGPsADUT1kifxm5aB8gMzGnYRee0JukwOjY72RGyCTZypAlkMTfcG/79fMLYQ9zLBfG58eFpDj7c+rM0G+MjdjhewwN7Mzw3cSZvUuy3t1Pb0FyHAyOvjN8o2Fd9h+8iGnOCvbKt/IqY3f/EFW3Yw1ftXNzdlxfJGLWpxHL7kiL1lxcd0uNPC8NdkFVMQHyDoufgBs1z6Y61k+A9p7Xx5q/Ibp5s4pbQdp9Cl5x9yqnVCemNvCeOip181t05gNPTSI+mVzE9I5edeCLt4h6Al74mIFuI5G05sYVpANwmM5p3EO/5XOwcQRPqD58qXcJzea23AcNZdXCZ7KDHMnLrXESQkYjxgruJbP3PGpCrwyhdemn2BGXmmuY7G9q6mpqamp6Qy/AFKpr/7WCrc6AAAAAElFTkSuQmCC>

[image53]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAYCAYAAABurXSEAAAC1UlEQVR4Xu2WS8hNURTH/0J5hoiExIBEISXyyACRVyZSZEAYfVJeEfVNDMgrKQYkShJKiSRFUUQpA49IIZGREsrA4/+/6+zv7rPuvveeO/juNfj+9evcu9c+e6+991prH6BLrVU/0ss3NlENzz+FnCUDvKGJGk2uZM+6Gknukone0ALNIddQZ/O6kWOk3bW3SvLnBNnlDbEmkVfZ83/RTPKSjPGGIK3oBhpMgE7WIPKErPEGSY7K4T3eEGkUWZo9pcFkMRne0aOYepK5ZBrpHrUrHORk3CadJhdg9pw08XuyzBtgnbeSk2QdeUEOkvNkJ3lDxnf0ri0llRzYDhtnQ2SbR77CQiKWIuA+6e/aS6v+QmZ7A7WA7EV5pefIRzIBdjo/YO8X0WbYUY8g75BP+v2wcVXBYmkjtaEVJ6pJP2RPry1kXPa7L7kDq6E9yCyyApVHmpL674NNvpr8RHlXQ3imckpOfyZjXXtNp2PpRQ1QswzVkZy/SB6hXIPDuKmcktPfyGRvKOr0cvIL6TAqqhAaCocgJfRvMj9qC6oaHlrpJ9jLsRTH68kp2PfAcdiEmlgaSo6SPtl/aWBGNWljlAdx0msByRCA5cBbMswbhpDnsESJpY564RmsQjwl92AL0IJ2IF9D1UcJrYSqdiHomHXcwWl9X7xGOp4lhUzSJgf0kaSdjKWaqmpxndwibbBir0S8SnZnfYKU+VrgH6TLp6T+Kp+66c7AbuG/SOeJ4l9zpWwlKaMfwwp8LFUGhUFYqf+f0kZUhlqQKpAcVwhpnJXIV5JYOi0tLmUrSTfcA7LIGxqUducQ0uExFXaB6JaTFGa3YSfZO3SKtJZcQv40K6TqcBnpAYpKiz6AxLUL2/3vZAlsjiOw0/UXiqRNvEmme4NXSC6RmrSetMurUP0bWKFxmDyE1WnlSGqDNHc72Zb9risdhb4NZnhDE7WQbEJBh7vUWfoHSRN2Vlh//2EAAAAASUVORK5CYII=>

[image54]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAnCAYAAACylRSjAAAHmUlEQVR4Xu3cfYjlVRnA8Sc0MStfStTYIpV1I0wNzWI1rUUD/UMFEXIxEQzWFEvN0mhDVsQ/NHSj3dhQQSp8F19otbLQ8YUUFSFYRaSgFVFUSoiULKzOl3PO3jNn7p2Zdebu7M5+P/Aw957fb+69z+/e5Tz7nHMnQpIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSdoO7J3i4/3gDuwDKVb1g5IkbUt/T/G/Em+Un6+n+H570iLxzRid74ea83ZGXJt/xuDa3NMc+1cZezHFJ5vxYVZEPveB/sBW+HCKS1Is6w8skM+leCvFfv0BSZK2FSbgVyJPktUnUmxO8dlmbLEg3z/E1Hz/Fosz3631nxRf7sZ+nuJr3dh0/p3ixH5wK+yb4qspPtiMzfUx5+LXKc5K8XSM7hw+n+Kn/aAkSfOFSfC/3djBKV4rPxcb8r26G1vM+W4tumOndGM/SbFrNzadcVzL9/uYHyvR2yXyUudMOOcbkTuwXBtuD/NO5KJOkqSxYOmKybD6dIqXUmxqxr6e4s8pvpvityk2NMc2plib4ozIE/tsJsGFsnvkfNuJv+bLT/D6a75nRs63dnr2ikG+P4uc72JDUVI7RVyLHzTHWl+J3FXifef8+r5zbfuCmKXNGyOf+1wMrjXjT5bxdZGLIq7pMymuK+dwre9N8WyKGyI/zxfK2F9SfKacx/lPldu9z6f4XXP/ipjdkj/PdWVzfyLy9eFzUfFv4uYUb5af1zTHJEmaN3+NPNkwGRLs5/pxij3LcSYtjn+x3D868n6e6u7I3ReKGYohiqJxWJni5RmCSX06SyLny8Ta51tdGlPzPancvjAG+VIczGWf1vaKJdFbIr/vh6b41eTDW7DfjcIW7PGqS8x0MNulS4or9grWgu7xFOub8ctSHBR5WZ7C7UeRC6M7InfB0D4mRR1LtEsjd7WWp9gncpHH6x6Foo1CkeKbYm02/7HgdfF+V6dH7kb3hSFLuC6HSpLGigmI7gf7uIh23xCOSnFVDCY47r89OByvRp5oPxqDzsn2qi7/1lyH5Utufb6Xl9u/iEG+x8TC5du/5hbH9o/JObYx08b5f0QumD4S+XPxpUlHMx6DooUincLpzuYY3bXaweQxJiLv/aq4X6M+BkXY91Kcn+KIyIVY28X6YQwe81MpVkfOs/4+ew/Zg3heOWeUhyPnNJtiDXTivtXc57l4zn4LAUW9y6GSpLGhGzbdZvs64dJBqJiQ323uM8EytjnFyc34fOO19sVHHxQq06EjRr6jkC/LfH2+y8ttJvqaL0tj48x3FHIc9X7NBzpgLJGz5DmquKMw6ve5oe4FrCh0KW7ajhsdvDUx+vpx7enA1aKqfimmd2oMvhxxU0x933q1s0bXcDaFNq+djmqvFm2168rrpLNHl0+SpLFgMpyIXKgMwzIX36hsj2+K/K05JnP2I9WlMCbrOjHfGrkLxbIWe5KY5EBRtTHFOSmOTHF/5Emb13FuimtTHFvO7THJ8pjTxWlbzh6OiX+iH2yQy0QM8iVH8qUDxO3flHNAgVrzpVCgG7Mq8lIyXRxyPiHF8eUculDkRveObiTLetxnWZYlVpA/14f7PBbn0F3iecGf3mDvFku6h5ex+UZRS4frj/2BBkuDdB5bFC5cD77NSbHHa2V/Fx3Lem5dXqdoascrjlMI8TjsTVtTbr9Xjh9XfoKCis8TWA6tS9XDUKyx7F2LQHKcqWi7L0b/B4AvHrC3kc8F7z3FIvgG6fX1JEmS5ursGPwNMqLtivQoPP4UubBgYqx725gE15fxu1I8UsaZNOnAUFRQ+DwUedJlkqRoYUKjODugnMNSEh0KftbJer71+a6YfHiS22OQL/uS2nxZUqv5Livjt8VgyZQ/GHtIit9H7rjQraIY5VuKFLl0hbieFH9PRC5Y6BzWSZ9rQJHGcR6fc8DvcR7Xtt1TNQ7kwrLv0v5Ahy9lsETMvkH2/YHOH4UsXwDgelEgXRC5UKY4f6ychzrOYzD+7TJOrhRLF0f+fa4Df/+NQpZ9aBUFF4Us/ykYVvxVvNffianLoOS3WzdWUajVz8p0wXtK0fbLyO8LS7r980iStM1QiDCJDds7RZej79DVQozN6I9GLkheiMmF0pLIBQ2dOYo9JvuVZXyh1Xx75NnnS1793y1jyRR0wyi0UHOtalEHig2KkhZjnEMBQGEMriPXapwohA7rB4fgs8A16gsU8q1fFmjH+s8I6jJ3/xhc/xbP1X72OJ8uJYUtxXDdy7ZQeD3D8pMkabv2YOQJlM7L2hQXRV5G2xC5+8IyKBMcf01/deTlN36yoXxHw1/kp2vIJnnyYvJmSZhuC504cqcztqacX7Wb6vkdukAUuevKGJ08zqFDx3Vi7xxLiRMx2D+1s2LPGt3eAyN/oWHYfyQkSdIM9mhus+erdlDoqPTdlNoZWcgOyVyRV9sVohhljC5Q7Tb1RUXfhUL7GFzDYb9bO3Y7M5ZJ2UPG/sq6R1CSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJGnH8n9KOFKqta4xuwAAAABJRU5ErkJggg==>

[image55]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAYCAYAAAC4CK7hAAADFUlEQVR4Xu2WTahNURTHl1BEJCJRIh+JomSgRAplQDFSDJSQUr7i5WNwS5KBiAH5LBKKkBQxeEwUBoiUUk8pUQwUhcL/d9fZ7+yz33117825Jvdfv+45e++791p7r7X2MWurrf+mwWKk6Jt2lKj+YpQYkHY0owXih/gj7otBxe5SNEI8Nl/zq5hR7G5eY8V7sT/tKFF9xEXxRAxL+prWXPNTWZZ2lCiMx4lz5k79E3WIz2Jq2lGiZolvYkPa0YhIaIxeap5sV0WnecIHkYjzMnjmPyzO6TVbEFiLNSeL1eaOMCcK84f1Yg2t0VZ14Jk4INZnzz/F0WjMOHE966f9gTgldoi74lA+tC5RQAihW2KVuCa+iFfmiY+RR8Ru8dCK808RH8XKqK1q4Buxy/K4XGNePUJ+DBQnxMTsPYRARSwUv62xuMbIk+YGsrNokvhk+TyLxF4xxDwyrlh+6jj+XczO3q2fuGRencaHRuuZHziwNe+2JeaFgJBiZzklqly9YidxPt7RND82mpfgOeZGx2OJiHByVWEoBpMPOIX4rZUfsSjJXWJM0l6PuOhuiw9iQtTOLsf5EVSx4kaHykaZ7o4AkowQiqsExnVZMT9i4VynFZ1vRKPFO3Nnwu2NQYRUYZet9lqcEhdmobIFRwiVIMLll1hhfqyEFGFz2TxuwykSfkHrxOLonRzg06ZHVbHckdNRW7zLPB82z40wNl6Lk8M+7OzWdHOjQlKTeHyShCPeY57M28wdXmt5IWATEMXighievSMqDGMqUVsQheOO5UkNO83HYzCbR/VElOa3WTsK9qUnV51kk3guzoh7Yrl4aXlJZVfxnjHsGAbsM5+M/9y0npfmFvNkZtFaeTZTvBDnzZ3abH5CT8UN881B2LfdPEdYi1PD4V4rZPqVi/F4HF9yjGHXwwTpeyr+f8x6/+Bkjfgrl3mYL/7q5RlYi7GcFvlRuD/KFosSMs2KvHxt+dc3yX7cPFrY9JaIHTwrpqUdDYjqxO1N6OME4cfFTVi2TOTM/LSxQRF65MejjIPmlayttlqlv0U4moWawwJYAAAAAElFTkSuQmCC>

[image56]: <data:image/png;base64,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>

[image57]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAXCAYAAACiaac3AAAC+klEQVR4Xu2WTahNURTH/0KRb6+IfLxnQOIVCZHUE8qAhIF8jJX0FKFkQJJSSga+UjLAABmRUG4oionyUQx4EiMGYoDC/2/t9e4++9zz7ru66g3Ov37ds/c+++y19lpr7wuUaqr6k7XkDNlLhkdjet5FDpLFpF801qe0hSyCObOPPCAtZCi5TOaTgeQUWRbm9CnJ0Ao5G9pTyAeyAubYjfCOtJJcIQNCO6PBZAMsnEfItOxwj1K4t6N2KsRSGmhHj5MTyKZGO5kcnqfDnFgKi1AFWScek1Gh3a0R5DYs5/TyLPIClqP1pAX17g4yDrao2lPjl6gh5By5BpszgzxB7dTYQ27BbNFzJTxLcqILtlZGejH1biN5ScZGfak8DW7CIikpzAr3pfAsabePkXuwDZPk9G/Y2rHmkYtkdGj3ygkZLgfOx53UXPKVrEr6Yyncv5Cfq4U/wXZcmkO+waLkmkAOwfLfpQw4DIuanBhD1iDvxH0yLLT/SgtpwdQQX1gLFUkf1G6mc+WE+jUu7Sc/YUUqY7SLg8KYS/WgWpwEG98M28iZsEh7lmgjVFMZubGpIUX9seo5oZSRsddh39Iunw79r8lWWKrpHdWK5jjvYdHSuO6IA2RheM8PgG4VGdIbJ9pgi11A9ZTxmvB897pRW0eo10kH+YKe0zXWSFh96q7ISWfxvzohw3fDdrU19OkI/Yy8E6od1ZBLKdMFi1KaWg2ryNii/lS6YbeRd+Qt7PzXUe01oSK9A/uWvulyJ0TuuGxUOh0+Im+sO6HLq1Gp8OLTSWn0X53wcKdhVeh/hF+XzvjxyOb/UXI1jEn+vfieWE++w04nV1PTSdoES4e20JaRSolHqBqnP2NPYcYsCH1usIrb5+qWV2Rnh7ak8/4ZshdbBxor7LpSxZ8kd8lqmAPPYZePSwbrj9grZI+4neQh7IZXGr0hS6Jxl/rkrI7ZzvCsuR7Vpkgf0/+ddbA/ZjWPshrSvFaY8/XmqciXw96dmIyVKlWqVFV/AEj9pUE7HbdFAAAAAElFTkSuQmCC>

[image58]: <data:image/png;base64,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37+xZbxdP1kQERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERGRneJ/oUrwdnh1DcsAAAAASUVORK5CYII=>

[image59]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAnCAYAAACylRSjAAAPVklEQVR4Xu2cCYxlRRWGj1FRwQXEFTQMKhAVFyJoNCojEdS4gIo7KoagaDCIiIpb2i2AgvsSF0RjEBCMEhcUSXwIwY2IEBWCmIxGIWjUaNC4xKU+z/299Wruff1m+j0cZv4vqXTfulvVqapz/qq63RHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMWZW7l3TbNrPjoJIOKWldd7xzf2omdyvplm3mVszHSnp4m9mxS0lPjbThLaZPbbHsGONtfd/IPnGn7nj3km7Tnx6FPnH7NnMbAVseWtL92xNbMLTV2BimPq1fuOv/zo5Dv1r2GGCskcSdq9+3RminIZvuVtK5baYxZu3sUNKFJf17JH2mv/S/vKSkWzd5m8r2JZ1V0r9Kenxz7oCSrirptJKOK+kLJT2kpG/XFw3wgJKuLeknJd2lOXdzAZH64DZzBrcq6ag2MzLYPTuy7Z5b0uUlXTp1xWzuEWn7eTm2pD3bzM3gcZF97qtN/u1KOj6yHu8q6bslvSKyb4wJfvHuyGe+rD2xQA6PFASzeH5JHy9pr/bEknhsSd8v6fySXlDSBSXtN3XFbPAL87YpQRsRNRS8NwWNYdqrHcPyC7+Jjf3CamL0T5HPXK2vbC77RPbNsyPb+LORZXtYfdFNzDXR+/BHNudg75L+EHmeazcV2oF7xyZCj4l+YmWMWTA49Vc3eQS511XHOGRmT4sA50lglhNlcBNchlaLEGEfaDMHwHEvMzAvGwIkYmkeEDFfbzMjbYgDbtsJYXx0kzcG9z6qzZzB+li7iBd/j2kR/9vICUXr/LmmFftjLEPEs3pycEn7lvSLku45fXoKxtBO3e+MM4QHq8vLgHb4aAyPo9+V9KGYT1hhr3nblOvWt5mbCWOYcopF+AX6Cf1qGfy5pM/HxrZiIvX/FGzA+5n4tv0Nm749chWsXhHcVJgQjgk24L2sghtjFswnS3p09/t2kQ4I8bOWAT2L+5T0zu53Asj7IlfchpiU9Iw2cwCCoeqwtYMz/lmThx3/WdKBTT5g71ogb6lcH1lWYCvz59Fvf9VQ/3u1mQMglAhMrEYui1mCjff/oDpmlevGkp5W5S0ShMLYOKIcyxCvi4Qx/I/qeBF+AT9Dv1o0TJoo65DP2TW2DMH2wciVsLq/IWDx7Qiutfj31QQb/Y32NMYsEJbv2TZQUGPlpnXqXyzpbdFv6TBQ31rSr0r6ckkvLemPMb3qwbYK59iWI1CwLUMe4EQVmM+MdCpjg5ugV3/T8p2SPhH5bc4PI1eEFBjrwMxqFcGa97OlxmoI5ea7L8rN7JzVj5/GcmaC6yLrxRYeq5cvihQgx0SudGCPK7prn1LS1dGvaHIPqwLYBudP3X4fuSUIOEuSoN5cO2ZDgsoksv4InVMjy0I7sG3IrJt0RkkbSjqCmyp+FHntJZHbIQh6gumbI58FOH+exaz+LZErPWzFsn0l9i/pyshtLdqRbRlRi3jagzZSH2lpVzRoX8pI/bGptnRbEY+ofU5ke9AvKCPP+lQM22QeZgk2giarMO1x3XaLhP4mG7YgWlRWxgDjlzGADTQGsAVtWotMWBe5/Yg9WfE8qcunHh+Ovh+rb7G6cnjk9byj3rZkJZn+zXiYRL+yrzGs75/o0/P6hbF2Bepd24T3y4fQzvgQ+YUhm4xBuSYxLlp4/7qSLor+Oj4FYVzTB5g8MZ7/Ermdyk/GFKthCCza6ZeR44r6YS/sg7+j3FqNvyHSToz/X0f6XJBgOz2mVy1PibQtbSfBhvjkvj0i78Mmsh/t+Y7INjwv+r7LT+qEPXkvExH5J8CXXVzSHao8Y8wawfEw4K/rfhK0cRCCwXy/SCei7yGeGH3wUWAjGEhwMNj5nkPncJo4Dp7bboduiHQoq32LAoiu10ZfPhwC4qfdSoEfR5YBuB4hSh2YXSJQKQ/BZ+zdOMtZ6bJIu8wCW9YrBG+I3I6gPAiJejWBYCf7wSMi60pQOrH7CTjJSUwHIUTdhhiuB1BntSu/PymyrQkKiBQEOvn0hQ0lrXBTB9tRh3W/Hx1ZnwNLelNJd4wMNpTt/ZHBhlW+Z3bXUx/6hSC4EFiB8tdiBrEvwU87Ub55VgTpawgEAhmw6iIhSPDV5IO6I+TYZhVcR18mDdlkHqjfmGAjIPJMsUzBRr8Y+i5UcE4BlLZmosYYQPhoDNCutOkk+v6GXdlmp98CtuJ+VkB3jmxjfAeQrzpr7FFnCQM964TumP6m1R+NYZ4B9Omxsdky1q7QbrMz4ZAPwRbYhLYfs8kY1HsS44JN8J5J9NdxX93vsdXJkcLulZFlkciRPWkX6sS3YUCfR2Dhm9WnmFSfE/0ESoINO9Q+6AndT/qg2gU/jYhm/AL3qF0Qb6wMA/bQ8yXYuPf82PgPRXj2rLFhjNlEcCY4KAkHBp0cprh3pIM4M3oBdmRkYKwFBw5Os2XOEbgFAknPZdXk+uoczoaZo77zGUNChSAhOCbh+OuyMIMkiNSCCufx+kinzLUIJla2cE4SgIsGp8bqosBZy/nJ0QocWy3YKBOrauQhSoXsUF+rZw2JDAlkVh6wCysoCEfagHZ9YZVPGZjpS5gTEAgMcuSILFa+Xh5pR67juXBsZP8gcPBcQDAhfoByExTUh9iGr23Ds7WiRt1qoTML+poEJUgwtKuuspGEB3CMeKDerU3mZVZQkggUswQbz5iVVuujXDNLZFCOle532g67MQZ4rsYA7Uqb0gcEqz6Ihb27Y8YafZjJkwI9vgE7027YEVG0R3c9Ygk7AG1O/9m9O8ZfqLwaw1oRxVbz+AUYaleND9pU/Yo+yB9jyIdoLL0qxm0yxmorbDWTmC3YJJwAe2FPfjJ2NX4ZK/X4lq3Up2p/ABJsGge0FeNZz6gFG9T14F49j/cy+WVCydiQmOT+h0b6h4O6vBqeXdveGLNGNNjPrfLamRIgtnDaNcxMdR/Oug7GBDGcjKidDYG5Fmz8Polhx4fgwskADqT9ngWntRLTWymAs6iFJ05DQQWHc0bMdsbQBsw2IWIkTMbAqU2qY+qAzWE1wQbc/9foVytgSLAR9AjWQzZEkNfiGQiaBNYWnnN0dUwAqwUHbaX7aE/atbajAp4g8EvQUV6CkJgl4gmGY4KNc7oPm9HXCGpA+9IPqF8r4iexcdD7W6RAIRiN2WQ1Zgm2tl5q8815z2pQr6Gy0D4nxPRf/jIGGL9DYwAb1RME2pAxCwr+ug9BflVMf9SOHXW9BB3tArSp2o57JOZBY1jXYrtJDPfp2i9wfqxdeYbKAm0frFe5Z9lkCN5fC8wa+uOu1fEkxgUbv8snCGzzrEh7IZipXyteOUcfV5+qxRdIsMHekW36mv70lGCjz3yvpHXdcS3YgPqcHPnZC+INuH+fSN9Ur24Kr7AZs2AUGLUyNgbbiQgwAs2Durx6RW33SOGEEzsxcqAymwacDAKJn++NfA7ppEgny4pMPYMXiKFTq2PeVTs6HCuO4oHRb6W8sTvHjL52YEdF/zE+oqQWc2Mcuko6OFb/X0s4tUl1vCmCjfodH+m4a+EhUSL7ggLj0GyWe9kCqmm3iQRiDfus746xYb3agvDTfaxA8Jy9ol+5IYC3wZu+QT+jbqxiCJ67X+T2Kc/kWftHfj/HM2+IPijXECA0MWiDPn2BPkGQoywEOlZVyb8wpgMnW3qsDvAOvX/IJlw3S5i3QYlrd+t+SlxLUM56z1qhXwwJCLa0GV91HSTwh1D5Vrpj+ihCHNo+i1jDztQPOwF9hPEHiCbamXP4BXyNzkkscQ2rsxrDtD3wzHn8wg4xu11J9CvAh9TiiH4isTFmEyawPFNtWIMwHPorUd5Be4hJ9OXDh84SbLXfYtVwEjnZZCwxsRCyzTyCDVuwWs/kTdSCDbvXk2EJNsYt16nsbMle1/2ufPr6NdU1gnsZm7U/MMZsBji5syIdKAkn+7ypK6a5oEsMTnFF9FsLCIXzS/pcZDBlqfzKSKF3TOT3Xl+KvB9ne21M/6k+gZs8voN6cUnfjPy/TDUIGP7/Fo7ivJj+32x8Z/GtmP5QHAd3TuTM9IAqfyXG/znrIkHYyr6HRX7ozO8ExPd0PzmmjNjoxupY9xHcJEo4xjEC35dopiuwD04c27CqxYz5kqkrEgIQInkoAB0X2U4K0EAZNnT5CG3dRxmwMdtJvJu25ViQR5vSB4CgRnloPwIq3wF+rbuOYInwoW8o+FFOVhcvjxScCC4CbAtBjJWR0yIFrkTekZGrW6oLfYM+T7+lTyA0xNkxbhMCGe+uAxIBnHeqzRg/TAoAe9C2CFGgPvTNQyIFJGNjWWgcESxJjEn6PjauWYn+DwVaaEPaWvdQXtqA9sFu1EHwjK9E/u8xaPsWoowAr3ZlQsA9tNXTI/uwzmkM61nQ+oVPx8Z+AcbalX71jegFHnWifvIh9bNWYtgmiBr6YT0xqNk/UrhSRtl8z6kr8i+6yUd4scpFn/lIZL9T/8FfAO/DFtgInyuRRlnxIeTTBhon8iMkxClQR+VRLrgocvJEP0W86b20gcYGdqFMtBNiFF90aaRdeS/lwh/gh7if59CvqRvH9fhnUllPQI0xNxE4YlbDatoZFefr7VQcihw3Akm/4zSHBBP3snKFw2oDTA2rGe27eZdm+HXe0OxuKCjf3MDxXt1mRtZ530g7DtlYzLJBa1uBKG8dcH0tbbZTdQw7xvQ1HFMurqUMdRk5rvuP8tZH1mesXMBz2vYH3tdCXrsiwrPHbEK/ZqWCSc7mQgCnDu17l0E9jnZpzgnqOmZP8ofsBgTu06tj6tOO+9aOHNfjmeerrbhf92oMtzaapz4w1K7AM9vyDfmQWTbhnFarhqB+lA/x0vZhkM9Tvx/yS2K76Ff1huDeoXouAuyi9tPP7bufrR1XAxHL6qkxxmzzMPNmq29ZsH3ErPmIyJUKVjqWFSi2ZPiXH8u085YMqylaneLfSLCSUq9ibwsgUk6J4f9vaIZBnNY7KMYYs83D9zPLCqAIQrY1Lo7cTnny9OltBra8tlXoW2zD0Qcui+FvCrd2WHU6OGav+pse7LTS/TTGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGNuPvwH3v1MUkIRwP4AAAAASUVORK5CYII=>

[image60]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAAA0ElEQVR4XmNgGAWeQPyfCPwViI2hejDAQiD+DcQ2aOLMQJwGxM+AWBNNDgwEgfg0EN8FYnE0ORAQAeKtQCyJLgEC+kD8CYjXADELVIwRiLmhbJDm6UDMA+WjgGgGiL+KkMRATuxhgBgiAMShUDYGmMOA6l+QP9uBOB2uAgeA+RdkMyhQvkDZ34DYFEkdVgAKflA0IPsX5OQ9DBC/4gUw/5YjiSH7FycASc5nwIxfVgZESOMEhOIXL8DmX4LAhQESsshp9x0Q7wBiISR1o2DoAgAXri9QT5a+dQAAAABJRU5ErkJggg==>

[image61]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAmCAYAAAB5yccGAAAId0lEQVR4Xu3ce6hlVR3A8Z+U0NPsbZQ0lmSpUeELzWISNSOM6C29ht6Gf5QPNCMYFDHtofTArCAKxAgrwiKNqAH/MCjCoAdY0YMoKlIICixK15e1f3PWWWfvOXfmnrn3WN8P/Lhnr3PunL3XXnfW7/zWujdCkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiTtj8f0DVpr3i9JktbMk0o8pG9coZeX+FjfqLV2fYlX9Y3/4w4t8eS+UZL0/+eEEv8o8dCm7WklftAcbzXe/6q+cYW+UeINfePg3yVOb47/UuI7zfGB+G+JM5vj75V4c3P8vBJ/L/Gwpm07HF/i7pidB+d02/CY6tZNJQ4ZjrfK20o8vjk+p8SjmuN19pQSvxuixxjgQ8ky/Bz8oW/cT/34+2GJFzXHkqQHgTeWuL9vLN7dN2whJpdX9I0r9JMYr1o8usSvY/65PVEnvM04LeYTnX/F/ARKFWVnc7xd3lviPc0x4+LS5vjy5vFWIHH81vA1kThOJdvrhsRyT4k/de1cw3Fd2xSun9iMfvz9rcRzmmNJ0oMAn7ZJUtIVw9czmratlJN0VlFeFrVSMeYrJU5sjpmUdkVNgKY8IaaX1UgSL+za7ov5aiPvsaPEi2PxfWh/ZdPOV16XkyUVlaeX+H6Jo4Y2cI2HNccYex9ec+TwmOs+d3i8Km+N2bk+tsRvSzx177OLkzyJbZ5PojpJ1faRJc6OxYrcs2L6vGnnesH9f23Uiifv0/Y1FSuqsKuU/c25jy3FPzHmxxp2lfhk19b7fMx/IDq6xNea4xbXyPhp+7RP7sHPyM5Y7Hu+n3PM9n780Y8kil+I2c8U18o1t/3rXkFJWkMse90yPH52zJbAtsszYlaRIJG5tsQ3Z0/PYdJuz3dXLJ9AmZyIMZ+I+eVQJq6/xvxEfWeJz5X4SIkfN+1MeDeXeE2Jr5Z4eNQlxMtKvH14zXUlvl7iRyU+G3UiJXn8dNSqX6t/HxKYG6Muj7Gc+q4SH4zFyXxVWKZlXLRL5S3O+dYSXyzxs6gJGkj4fx71e98Z89WwHVGviaouSdeHh3aSOJJiXss10Xckj7+JmjBzX545vBb0wUnN8SpkfzN+vhTj181YO3l4zL3jtX3S3qNC2SZsnylxVnOcLinxy6h9QEKf+FngZyLxurui3n/GzEVDO+fzq6gfOLiW18Xi+OO9Wd4nGH+cO/sCqZzmfs5jSvx5eCxJWhP8J597tvik/dE4eEuhh0f9VD8V6aoS/yxxXtTze3/UCX1fmEg/FcsnT1DFGavYUT1iqYgKWJ5TuxSXy1u5nyqPsxLIxMwkyvPPjTrh828wAZ86vAZMjjkBkwi+I2qyQrKHqfe5IOo5cr9eMjzHcV8RTH3/trFsDxj9ThWmTV5bJJmZiOX+O3A9JNG554r7lokcicG9w2Nwj0m6SM54/VFRK0AkglkRop3x0CPZI+kb01/rsuvO/s2q0sUlXrj32UVcH2Nt2QeDxIeOTNi4pztmT+1FArd7ePzSErcPjxkn7fXT729qjhnL/Nt8AGEfavpQ1PPkmtvxR7+SxFE9xflR7x/P5/0kOSYBlyStkX7Zi+rIVPVps6gM8Kl+KhLLoSwDfbnEsU37vpC0UAnbiKmEjeXQsb18iUpWu5eNpVUmtkwCmHT5foLlM5C0kYhlMjC2JwskLzlhLnsfHtMGvmcsqeLf7/u3jay4TGFcsFTeLoemvIZMOkmc2mSB8+f+9Ui++L6U10HCwOt/H7Wa2o4/2scqiCRsY4nqgVx339/LkPQw1k7rn5iQyRT3j2rXGJZN+eUWtiZwjrk8zrnl9ff9Dj5cMd5Iskjke/34y7HU2x2zJXruO0mdJGmNMNmOTXxTqJbw5zBY9puKfp/T/vpP1OSJxIpJiOTq43OvmGHypPKUlTWWG3PJagoJDklC746oyesU+qlNTKgYMXFTIWIJ9O6hnWQnq5ScG1W7nVGrb0y+XB/yt/SoKjHhMiGzx23qfdBW1JhgSYJ4/6uHtlVhXEwlr9wPEqaUEzzLvSQaJBVtYpa4JipEIInJPjopFve0Ue2lP74bdcyRyLV71v4YtXK1Cn1/g/fMKl+L+5mVtSNi+VhDJkksc76gew5Z9Wqrf3n99COVaZaOGSftXlMwLhgf9NOepp3vf0Qsjj/6PKuh5w1f+/uZFXdJ0ppYtuy1XXLPDpM4j18/xBh+q5EJKzGJkrTtC0nPWNWG5bqxRCORZNzTHHNuJCBMpOw9oi/x/Kgby8HS1i1RE47jok6YfB8VjxuG15wT9R6cEvWeTL0P+Jr3i/6hMkdl7/KhbVW4lrGKDUgQWYLmXAkSO5aDM2kkiRxbxvxp1Nc9LuqftCBRA33Rvp52lg5JdLL9fTGfQJG4bPaDQaK/2z1bb4m614vrbPH+jLV22X0jHxByyfUDMZ4EgkppVs4yAc8E7fioy8RUy6jE5XmRVH47av/Rr+1+yhuj7nPsxx8fDEiwWfbP8dcmgvxbJJdZwZUkaVK7XMjkOPYbe5vFJMYEeCCm9kJx3lRDen0b19RO+mCC7K9z7H36pdSD1T8bwUTP+ZCE5H47UGGcSkyQy63ta7iGsT+UTN/1/cd92921rQL93V7HKrGncRnudb9UTx/1Y4BzHOsrjI2Zvv+4Z+33ckxwP9u9bJIkbbu7olYutDWoBuWyJ0kBlcEDRfUyK5jaHJaZfxF1SZVEmKrbRv6YryRJW4LKFHuRXt0/oYOCpbY7o+4TZMmxX27cKPb9UR3VavBzcFHUe3NNLP4tQEmSth1Vnyv7Rq019rTlbzxKkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqQ18AD7bl5Qu/RNZwAAAABJRU5ErkJggg==>

[image62]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAZCAYAAAAMhW+1AAAAl0lEQVR4XmNgGAW4gDgQ+wKxHRCzIktIAPEaIF4PxBFAXAfEu2CS8kB8BYhnMUB08QPxCSB+C5JkAeI5QPwEiBWhGkBiSUAcQJQCTQaIUSD7QRIYAOTi/0BchC4BA54MEAUgheiAC0TIAvFtIE5AkWJgcALidTAOyBSQI1czQLx6AIjbgZgPpgAEQP4HhaIYEDMjSwx9AADJfBce37n/6QAAAABJRU5ErkJggg==>

[image63]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAXCAYAAACS5bYWAAACPElEQVR4Xu2WwUtVQRSHj6RQaIgYieTGaBO5CMRMUNwWogtXQgt3Ba0i0sCVLVoKkdCiha7ERW11IUKKImLrxI2EIkGB/4L6+725I/POnfOae4tHiz74uI8zc8+deXNm7hX5T31pgVd1sA40wVYdrMV9uCgFb/pLcLDv4LhuiNEFv8B7Kt4A++F7+AGOwCtVPdJIydMOV+EDFa+CiTir2Uh8Gm7CbnHJluBHcf9EKkXyPIJr4soxSg88yK4hvfAnHAxit+GRuKSpFMnDEtyBEyp+yWu4IvmN9VZcws4gdh1uiatt/mMpFM3D/p9ho4pXBsiBzhhx/RAuzwb8CtuCuEWZPI/F9ec+qoIJ2DCq4j6Z9RAdt7D6W3HCsjmBfSoerSfiJ6GT1XpIjDJ5rD+wMtjj7BrSAQ8ln6zWQ2KUyeMH+0TFzcFayay4hdXfihM/2Jcqbg6WO5E7UifzD+FO5o7+HWXymGXA8+6HuB2o4ZF2Cu8GsRvwm7g3kYcH+83sGiM1j8cck7/pmW4Ad8TtyvCAHoK/4EAQm4Pnkn8DelLzeHgKsM7DyVVoEHcwx2ZI+GHxHT6Fk3AfPpfqg/wFPIPr4pY3RkoeDzfWhhi5OOM9yR/OHr7LWT+Uv2NwheZhs24ISMnDGl8We5UqN25L/j1dBC4nP1b+FJbMbnY1GYOf4DXdkACXa0Hyn5dFYUm8ETfpWHlcwsapzJodI3AjDOtgCbjpeMwlffzz6HkFH+qGOnBL3NdW0kD/aS4AGQuEbViaCyQAAAAASUVORK5CYII=>

[image64]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAYCAYAAADtaU2/AAABz0lEQVR4Xu2UPShGURjHH6EIyUckpCSFYsBgkAhlMZiUbDIZZKAwGBgMShksPjIgURiYDK8sSimDhYUSk0UxkI///z7nfe9x8ub1yqL7q1+3e8655+N5nnNFAgIC/hOJsBa2wzSYAMthG0y1xsVCMeyAOU57Cky3GzLhGhyCY/AMzsIpuAi3RT+KhS64AqdF5wkvzu85z4boIb2TTcJGM6AAXsN1WA3vYUicnUYhDy6JLjYCb2GJ6SuFd3DUvEs2HBf/RDXwAfbAZNgLK03fd9TBPtEIHotuPsn0tcJn8/wSLvgomu94aYBPsNtqY9puYJHVFoFhX4YnMMvp+wkMM8PK8BIW6wHcE6tWGJY52A9z4bno4twEYVWzLwzDz1zyGQ0WV0j8ugjnl6eOwLJ/hzOwGb6I7phwU5ykzLwTjuP4CavNZUH8hXmAYfgqTn65m1O4CnfhILwUvUb7sMUf6sH+N9HQRat0FhnzuQV3RIvqChZaYzwYd4bPu19fvLswJUwPc+fCbzJEU5Evej1D8rnC44ZVy/C5cOJ50evIa0k6RW8Ja+VXMLz8SVS5HeJX76ZofdTDCzggfrHGTQVschst2HcIj0TzG+vPJ+Bv+ABNRUqUO2iUbAAAAABJRU5ErkJggg==>

[image65]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAXCAYAAAAyet74AAAA7ElEQVR4XuXRoYpCQRTG8bOgsOKCwgZd2GQQBJvYtNpMBgVfYTf7HhZBFkxisQqCxSaIZR/AoEUMNjUY3P2fOzM69z6B4Ac/HM89d2Y8ijxUXpBHDcnIs1sS6OEH31jgM9RB4uhjYNevmKDjN2ma2KNov+sVhpaug7xjiRFitvaGuaXrIC1c7afLBzbi7ag76E475O59UsYZXVfIYI0Ltp4j/tB2jSWcxHtTzCljHFBwxbqYI/QoF72r1qpeTSpixqI7a3ToUzGDdxMIondciXlBf90XZkj5TS4N/Iq5l/4b2fDjcHSo6WjxufMPwr0nO/SEKf8AAAAASUVORK5CYII=>

[image66]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAYCAYAAABurXSEAAABaUlEQVR4Xu2WvytGURjHH2GQ5LeSTWQwSJLBSAZlkTJYTJiMlFIW+QfsMog/wWBQSsrAYlFS8iMpRbHIj8/zPvfWeW+9173Lfe9b51Of4T7nnPqe03PPvSIejydrBnEiWswjI7iC5/iLq8XD+URDT+EkfkiFhA4ZkoSh68V6SBdUR8ay5t/QGnAZL3EBN/ECb7HXmZclsaGrxBr/HnuCWh0e4hW2BbUoLWJz7lK4XliZjNjQ/fiC22IbUJrF3t49p5Y1saE38AfHndoAvuOiU8uakqH1FPU0n7Dbqc/hJw47tSi6thU7U9hUWJmMkqGVXTzBhuBZw+xIfD8rtTiGMynUOzgpsaGX8Aa7xALP4reUt5+VMPRadEDRE9vCB7zGA/yS8vWzHuKj2Cc89FWsGzqceUVoP+sOdae5ZFTs9mgPnmtwH8+wMajljiN8xj6x/p3HN5x25uQO/c84xWOxT7jeGroBj6cS+QPvRVFHiucp1AAAAABJRU5ErkJggg==>

[image67]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAYCAYAAABJA/VsAAABhUlEQVR4Xu3WvytGURzH8a9QJPk9yCKRwWCQDBZFymCRGCwmTEYmsYhJKZNFBvEnGAxKSRlYLEpKfiSlKBb58f4+5w7nud3ufZ54nqd7nU+9hvvtnLrfc+85HREXFxeXeKQYY2j21ROXcgxjHXd4Q1faiARGmx5CHxblnzRtZ16yaLoCg2IG676IazJqWhucxTmmsIwzXKPNGheXRDZdhDncotWr6f7YxwXqvZo/tWLG3GRhITUz94lsugNP2BCzAJoanGLHquUrZWjMUJ0Ev19k00v4woBV68Qrpq1avqIn8GaGVlFtpqUltGldJf2aD2ix6hN4R7dV80fn6kr7Vz9M0AvmIqFNa7ZxhErvWZvZkvD9rClFP0az0JOamftENj2DKzSJaXgcn1KY/fxX0aZD/1T9Yitirm6X2MOHFGY//yZ6x9B3f8a35R5r1rjA6H4O/TXinl4xp3eD91yCXZygyqslLgd4RLuY/TuJF4xYYxIXvWcf41DMFVRPbV0AFxeX+OUHQMBZSWo9RbcAAAAASUVORK5CYII=>

[image68]: <data:image/png;base64,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>

[image69]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAAYCAYAAACLM7HoAAADKElEQVR4Xu2YWahNURjHPxkyy5AhU/EkMg8pHohEGcqLkiGUIVNKStT1IA+S8YWUPEikkHmIWyThwZMnCg8U4cWLFP6/1lru2fvu7j17n7PvObR/9esMa9+79/ftb31r7WNWUFBQUJAXs+RH+bvEr/KTf/9dHpE9wx/UOXUVz2n5U86IfT/R3AXdld1jY/VMzePpIR/JN3JAbIwTN8pfck50KDPtzZ0zL9o6nkRGyS/ykuwQG+stn1vyXc9KF3lIXpdjZbvocMW0dTyJLDLXb3bEB8R0+UM+lb1iY5XSVx40V1WzzVVwNahVPBGOWfKd46T35Wc5OTZWTVg09pgLdLFVntxax/O3x3D3zslT3rPygzwjh4SDc6ab3CZfyTXm2kRa6iKe0H/uyeFyUImdS44D7vRG/5onJJOkZklumniy0tVamU2h/+yODyQwTp6wnLcino5yhXwtl8TGWiJNPFmgoG7LSfGBUug/uW8vUhCq9KV/TVOlkHc8FBYLa7/4QCDs597KwdGhCGx5qJabcrz/bqG8KEfLdfKWXO2PzULopyxWy8xValrKjScwUh6WV+RKc1Oah4Orcr4/hspcby6JO809NLyXR+VQf0yEMfKbvGEt9xv6FCdhSjWYu+C1/vMd2cdcz2r0r2mo5raq3Hhgqrlkcu0UAgsYN3ODXCovmLsWKv6yNf0/ZgJJbsZM+c6aPx+TqCT6y2HmKpVtChfC52vmehjQYx5bC9MiBsmnPz+U0yx7hUPaeKi+J9Z07cDuYJ8caC7By/33FE7ozzw4PJBT/OeKYdPMihpWfqqV6hrhP282dxfLgS3NScvnaaocKAB2FuHaSdYzc0kujYvqpEpDf2bGUgTlFk6rkLBdcoG5aUbFUrnsBJD3VMxWq+JJc4LFhoqj9cBccy2DgiHhPD7Tn7n59Hhm0ipz1cvel36/yR9fETyrH5dbzFUXj4ANfoyknpd75Tz/XT1DUvj5b7/cbu4XLaY9kCgWYBbNA/KFf+VGkHxmK+1ggj++Ikgkdy9M104WXaFp6myK/yXCLItDLLQEYiVGdiYB3mfZmRQUFPyf/AED0K75LTcftwAAAABJRU5ErkJggg==>

[image70]: <data:image/png;base64,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>

[image71]: <data:image/png;base64,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>

[image72]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAXCAYAAAAyet74AAAA0UlEQVR4XmNgGAXUBHxA7AnEslA+NxC7AbExEDPDFHEC8VQgrgLiZ0DcAcRrgDgaSs8CYlaQQhcgrgZiTSB+C8RzoJpBwBSI30PVMCQAsRkQ+wHxX5ggFNgA8W8gLoIJgNy0hwFiFQtUDESD+CBbQLaBgRIQPwficpgAECgC8RMgns6A0Ay29j8QN0D5jEDcDMRXgFgeKgYGrQwQR58A4tVAfJABYq0EsiIeID4AxFsZIL4VhophAGzuwwrSGCDuiwNiATQ5FAAKeRiOQJMbDAAAPY4is2frKHoAAAAASUVORK5CYII=>

[image73]: <data:image/png;base64,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>

[image74]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmwAAAAmCAYAAAB5yccGAAAFnUlEQVR4Xu3dW8hsYxzH8b8cIoTIIcreLhTtuBBSRE5xQWoTIiUXSiSE2m52oaTI6cKp5EIOuRFSEq8bKfe4UZuUXCAX1CaH59taj3nmPzP7He+smb0330/922s9M+/MrDVvvb/+z7PWjpAkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSZIkSf9F++eBJdmn1KF5cMVWcayH5IEZVvFZJEn63zs65v/jvKc6rNRzaWzfWM5x8ZoP5cElOrDUMWnsjLS/DCf2tSuE1y1pjN8nzr0kSRrQd6VOyoN7mbXoQltrWyznuFYZ2Ahr70Z3fK15Att9pT4udWSpV2J2J4zz9mB0x/V5qa3NY8+Uur/Zz65L+yeUejiNSZKkBREI1mI5nahVOajU7WmsBp1lHNcqA9vxpXbEZAiaJ7B9X+rcfpvgelnzWItAdkS/fUOpL5rHzkn7Lc7xC2ns4lJXpjFJkrQg/sBeVWpTdCFg6KkspvLOiq67sym696rvcUWpC/ptMM5noDPUBpLj+qJTtF/ax60xuaaM4/qj3+Z1CS5DHdu0wMZrX1rq4DS+KMIUHdDTYvwY1gtshKmvoztP4DN/FqNgVp1S6odmn9f9pdnHi9FNfWa3xXiHLYfky2P0/pIkaQEEgg+jmxL7qtQT4w8vjCm5v0o9W+ruUjdFFwDujO6P/fvRTaOB9/4muhDxVoymOD8t9VupV6PrOPF6P5Z6tH/85f7fFh0pggiv8XypT6ILEEPIge3k6D4jx7YW3XEOhQC0s9RH0R3ne/34eoGNz5gDW7tf5YCW98HvSA7EnNeXYnxtHV08wiU413w/74weliRJG1Gn22r35M1SH/zz6HAIGkc1+7+WOrPfJiDQaQMdmsP7bYJFG8T4jIQ0wkO7FosgstbsVwQHQs6x/f7NMX0NV+3WTatZ06ltYKPj922pzf0+YY3AmfH56Qjm96jFsU+zM0ZTjG2YWi+wEaTmCWwEKwJwNS2w8f3ktYDbo+titgjJfLfXR3e8d0UXZiVJ0gLaaUPsiMm1UkMgeLXhh0BQA0cb2Jju21rqy+jCY+6cvV3q5zQ2K7BxXD9FN23HGrdpCEl032bVLaOnjmkDG+GMz0pwo9ieFvQIoo/E5HvUmtX9o0tYAyDry2q4Wi+w5YCW96sc0PI++H5OT2N8N3l6lW4gndDXSp2aHpMkSRtEuFjrtwkbTOsx1cVarOyiUlfvos4ePXXCvIHtzxhdPECw4OdqF4eOzb2lril1Yz+GGpJa7YUU/Mvjd5Q6f/SUhbSBjc9ewxZrzH6PbqE+3aUhtKGVxf9v9NttYKNzyK00sjbs0eF8qnmM23Xwc/Uc1Q4f55vQ1SIotlOffBfTAiMhmW4g54TzwHf4+NgzJEnSv7YjRh01/riyzbQdNRT+uHNLiXYNVA5sXDQAAlu9hcQl0YUVwgKdN7pdvAavR+eMCxkqgkg7pchUbz2utX6b5+TbfmxUG9i2xGjKkulkju2BmJwu3KjaveO4CWz1vmhtYHosxqc1K6Zq60UB50UXJCuev73fJgBv7rdZy0hwb22L8fPLc6d1LevtYQhsbF/blyRJWgBTWgSBiqA2ay3VqvD+tRt3QEy/OjEjQNTbV4CA1/5cXRc3lDaw1f3a4aJrNdTVqOA4+F7yMeQOFx20aVeo8rMEqPVCOGvN6JTmdX6c2/a2HoTHp5v9Vvu7M/R5kCRJezlCDTd4nSfcDSEHtt0hB7a2ezYkum+vN/tMsc4KbJIkSbvEFGld37Vse1pgI0QNtT6vRQC+p/+3ejIm/5ssSZKkuV2YB5aEqb+67m53WcXtMrj4JHctueo2j0mSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSpHX8DTTrx3wBbwExAAAAAElFTkSuQmCC>

[image75]: <data:image/png;base64,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>