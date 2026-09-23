import { useEffect, type ComponentType } from "react";

/**
 * A simple Higher-Order Component (HOC).
 *
 * `withLogger` takes any component and returns a new component that behaves
 * identically, but also logs to the console when it mounts and unmounts.
 * This is a common pattern for adding cross-cutting behaviour (logging,
 * analytics, subscriptions, etc.) without modifying the wrapped component
 * itself.
 */
export function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P> {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithLogger(props: P) {
    useEffect(() => {
      console.log(`[withLogger] ${componentName} mounted`);

      return () => {
        console.log(`[withLogger] ${componentName} unmounted`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  }

  WithLogger.displayName = `withLogger(${componentName})`;

  return WithLogger;
}
