import { symbols } from 'skatejs';

export function getShadowRoot( elem ) {
  return elem[ symbols.shadowRoot ];
}

export function omit( obj: {[key: string]: any}, excludeKeys: string[] ): {[key: string]: any} {
  const objKeys = Object.keys( obj );
  return objKeys
    .reduce( ( acc, keyName ) => {
      if ( !excludeKeys.includes( keyName ) ) {
        acc[ keyName ] = obj[ keyName ]
      }
      return acc;
    }, {} )
}
