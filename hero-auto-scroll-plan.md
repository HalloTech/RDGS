# Hero Section Auto-Scroll Implementation Plan

## Overview
The hero section of the homepage currently uses a carousel component that requires manual interaction to navigate between slides. This plan outlines how to implement auto-scrolling functionality for a better user experience.

## Current Implementation
The hero section (lines 74-105 in homepage.tsx) uses the Carousel component from `@/components/ui/carousel`:
- It displays the same slider image three times
- Users can manually navigate using previous/next buttons
- No auto-scroll functionality is currently implemented

## Solution Approach
To implement auto-scrolling, we need to modify the carousel component to automatically advance to the next slide at regular intervals.

## Implementation Steps

### 1. Modify the Carousel Component
Update the Carousel component in `frontend/src/components/ui/carousel.tsx` to support auto-scrolling:

1. Add new props to the CarouselProps type:
   ```typescript
   type CarouselProps = {
     opts?: CarouselOptions
     plugins?: CarouselPlugin
     orientation?: "horizontal" | "vertical"
     setApi?: (api: CarouselApi) => void
     autoScroll?: boolean
     autoScrollInterval?: number
   }
   ```

2. Add auto-scroll functionality in the Carousel component:
   ```typescript
   // Add these to the component props
   autoScroll = false,
   autoScrollInterval = 5000,
   
   // Add this useEffect for auto-scrolling
   React.useEffect(() => {
     if (!api || !autoScroll) {
       return
     }
     
     const interval = setInterval(() => {
       api.scrollNext()
     }, autoScrollInterval)
     
     return () => clearInterval(interval)
   }, [api, autoScroll, autoScrollInterval])
   ```

### 2. Update the Hero Section in Homepage
Modify the hero section in `frontend/src/components/component/homepage.tsx` to enable auto-scroll:

1. Update the Carousel component usage (line 74):
   ```jsx
   <Carousel className="w-full h-screen" autoScroll autoScrollInterval={5000}>
   ```

### 3. Pause Auto-Scroll on Hover
Enhance the user experience by pausing auto-scroll when the user hovers over the carousel:

1. Add state to track hover status:
   ```typescript
   const [isHovering, setIsHovering] = React.useState(false)
   ```

2. Modify the auto-scroll useEffect to respect hover state:
   ```typescript
   React.useEffect(() => {
     if (!api || !autoScroll || isHovering) {
       return
     }
     
     const interval = setInterval(() => {
       api.scrollNext()
     }, autoScrollInterval)
     
     return () => clearInterval(interval)
   }, [api, autoScroll, autoScrollInterval, isHovering])
   ```

3. Add event handlers to the carousel container:
   ```jsx
   <div
     ref={ref}
     onKeyDownCapture={handleKeyDown}
     className={cn("relative", className)}
     role="region"
     aria-roledescription="carousel"
     onMouseEnter={() => setIsHovering(true)}
     onMouseLeave={() => setIsHovering(false)}
     {...props}
   >
   ```

## Alternative Approach
If modifying the existing Carousel component is not preferred, we can create a new AutoScrollCarousel component that wraps the existing Carousel with auto-scroll functionality.

## Testing Plan
1. Verify auto-scroll works at the specified interval
2. Confirm auto-scroll pauses when hovering over the carousel
3. Ensure manual navigation still works correctly
4. Test that auto-scroll resumes after hover ends
5. Verify behavior on mobile devices

## Performance Considerations
- Use `React.useEffect` cleanup to prevent memory leaks
- Ensure the auto-scroll interval is configurable
- Consider disabling auto-scroll on low-power devices if needed

## Fallback Behavior
If JavaScript is disabled, the carousel should still be navigable using the existing previous/next buttons.