export interface EjemploProps {
  id: string;
  tenantId: string;
  name: string;
}

export class Ejemplo {
  private constructor(
    readonly id: string,
    readonly tenantId: string,
    readonly name: string,
  ) {}

  static create(props: EjemploProps): Ejemplo {
    const name = props.name.trim();
    if (name === '') throw new Error('Ejemplo name must not be blank');
    if (props.tenantId.trim() === '') throw new Error('Ejemplo tenantId is required');
    return new Ejemplo(props.id, props.tenantId, name);
  }
}
