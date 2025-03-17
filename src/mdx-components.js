import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs'
 
const themeComponents = getThemeComponents()
 
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    figure: props => <figure className="mt-6" {...props} />,
    figcaption: props => (
      <figcaption className="mt-2 text-center text-sm" {...props} />
    ),
    ...components
  }
}
