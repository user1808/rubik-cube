import type { Component } from 'vue';
import BasePrimeIcon from '../icon/base-prime-icon.vue';
import type BaseIcon2x2Cube from '../icon/base-icon-2x2-cube.vue';

export type BaseSettingsSection = {
  title: string;
  icon?: typeof BasePrimeIcon | typeof BaseIcon2x2Cube;
  iconBind?: Partial<InstanceType<typeof BasePrimeIcon>['$props'] & { class?: string }>;
  content?: Array<Component>;
};
