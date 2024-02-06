import { DefaultNamingStrategy } from 'typeorm';
import { NamingStrategyInterface } from 'typeorm/naming-strategy/NamingStrategyInterface';

export class CamelCaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName ? userSpecifiedName : this.camelCase(targetName);
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      (embeddedPrefixes && embeddedPrefixes.length
        ? embeddedPrefixes.join('_') + '_'
        : '') + (customName ? customName : this.camelCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return this.camelCase(propertyName);
  }

  private camelCase(str: string): string {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
  }
}
