import type BaseIconCube from '../icon/base-icon-cube.vue';
import BasePrimeIcon from '../icon/base-prime-icon.vue';

export type BaseSettingsSection = {
  title: string;
  icon?: typeof BasePrimeIcon | typeof BaseIconCube;
  iconBind?: Partial<InstanceType<typeof BasePrimeIcon>['$props'] & { class?: string }>;
};
