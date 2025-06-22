import { Fragment } from 'react/jsx-runtime';
import { nanoid } from 'nanoid';

import {
    TabsContent,
    TabsList,
    TabsTrigger,
    Tabs as TabsUi
} from '@/shared/ui/tabs';
import type { Tab } from '@/shared/interfaces/Tab';

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  tabClassName?: string;
  tabsClassName?: string;
  onTabChange?: (v: string) => void;
}

export const Tabs = ({
  tabs,
  onTabChange,
  tabClassName,
  tabsClassName,
  defaultValue = tabs[0].value,
}: TabsProps) => {
  return (
    <TabsUi onValueChange={onTabChange} defaultValue={defaultValue}>
      <TabsList className={tabsClassName}>
        {tabs.map(tab => (
          <Fragment key={nanoid(4)}>
            <TabsTrigger value={tab.value} className={tabClassName}>
              {tab.prefix}
              {tab.label}
              {tab.postfix}
            </TabsTrigger>

            {tab.content && (
              <TabsContent value={tab.value}>{tab.content}</TabsContent>
            )}
          </Fragment>
        ))}
      </TabsList>
    </TabsUi>
  );
};
