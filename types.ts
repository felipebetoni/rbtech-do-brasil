
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface ProductFeature {
  label: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role: string;
}

/**
 * Interface representing an equipment item in the Marketplace
 */
export interface Machine {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  condition: string;
  year: string;
}
