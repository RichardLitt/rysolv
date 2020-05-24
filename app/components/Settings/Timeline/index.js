/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-expressions */
import React, { Fragment } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { ConditionalRender } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import { userTimelineDictionary } from '../constants';
import {
  EmptyOverviewListComponent,
  OverviewListComponent,
} from '../OverviewList';
import SettingsExpansionPanel from '../SettingsExpansionPanel';
import {
  HeaderWrapper,
  StyledBaseDropDownMenu,
  TimelineActivity,
  TimelineContainer,
  TimelineContent,
  TimelineDividerContainer,
  TimelineDollar,
  TimelineHeader,
  TimelineHorizontalDivider,
  TimelineInfo,
  TimelineListItem,
  TimelineTitle,
  TimelineType,
  TimelineVerticalDivider,
} from './styledComponents';
import { StyledH3 } from '../styledComponents';

const activityData = [
  {
    amount: 5,
    date: '04/21/2020',
    issue:
      'brainhubeu/react-carousel: Add inertia/momentum/kinetic movement. #40',
    type: 'funded',
  },
  {
    amount: 1,
    date: '04/16/2020',
    issue:
      'brainhubeu/react-carousel: Large images are not centering correctly. #289',
    type: 'funded',
  },
  {
    amount: 1,
    date: '04/15/2020',
    issue:
      "brainhubeu/react-carousel: itemWidth doesn't work for the last item. #378",
    type: 'funded',
  },
  {
    amount: 2,
    date: '04/15/2020',
    issue: 'brainhubeu/react-carousel: SSR (server-sider rendering). #376',
    type: 'funded',
  },
  {
    amount: 1,
    date: '04/15/2020',
    issue:
      'brainhubeu/react-carousel: Recalculate Slide Width When Container Width Changes. #160',
    type: 'funded',
  },
  {
    amount: 200,
    date: '02/15/2020',
    issue:
      'piotrwitek/typesafe-actions: Make actions compatible with new Redux Toolkit guidance on TypeScript usage. #230',
    type: 'withdrew',
  },
  {
    amount: 1,
    date: '01/23/2020',
    issue: 'FreezingMoon/AncientBeast: bad z-index stacking. #1612',
    type: 'earned',
  },
  {
    date: '01/9/2020',
    issue:
      'FreezingMoon/ AncientBeast: slide-in abilities if currently usable. #1635',
    type: 'submitted',
  },
];

const UserTimelineView = ({
  attempting,
  filterValues: { users: usersFilter },
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  userId,
  watching,
}) => {
  const AttemptingComponent = () => (
    <ConditionalRender
      Component={OverviewListComponent}
      FallbackComponent={
        <EmptyOverviewListComponent handleNav={handleNav} type="attempting" />
      }
      propsToPassDown={{
        handleNav,
        handleRemoveIssue,
        list: attempting,
        type: 'attempting',
        userId,
      }}
      shouldRender={!!attempting.length}
    />
  );
  const WatchingComponent = () => (
    <ConditionalRender
      Component={OverviewListComponent}
      FallbackComponent={
        <EmptyOverviewListComponent handleNav={handleNav} type="watching" />
      }
      propsToPassDown={{
        handleNav,
        handleRemoveIssue,
        list: watching,
        type: 'watching',
        userId,
      }}
      shouldRender={!!watching.length}
    />
  );
  return (
    <TimelineContainer>
      <SettingsExpansionPanel
        Component={WatchingComponent}
        title="All Watching"
      />
      <SettingsExpansionPanel
        Component={AttemptingComponent}
        title="All Attempting"
      />
      <HeaderWrapper>
        <StyledH3>All Activity</StyledH3>
        <StyledBaseDropDownMenu
          handleChange={value =>
            handleInputChange({ field: 'users', form: 'filter', value })
          }
          selectedValue={usersFilter}
          values={['All', 'Earned', 'Funded', 'Submitted', 'Withdrew']}
        />
      </HeaderWrapper>
      {activityData.map((activity, index) => {
        const { Image, title } = userTimelineDictionary[activity.type];
        const TimelineListItemComponent = (
          <TimelineListItem key={`list-item-${index}`}>
            <TimelineDividerContainer>
              <TimelineVerticalDivider /> {Image}
            </TimelineDividerContainer>
            <TimelineContent>
              <TimelineType>{title}</TimelineType>
              <TimelineInfo>
                <ConditionalRender
                  Component={
                    <Fragment>
                      <TimelineDollar>
                        {formatDollarAmount(activity.amount)}
                      </TimelineDollar>
                      &nbsp;
                    </Fragment>
                  }
                  shouldRender={!!activity.amount}
                />
                for&nbsp;
                <TimelineActivity onClick={() => handleNav('/issues/detail')}>
                  {activity.issue}
                </TimelineActivity>
              </TimelineInfo>
            </TimelineContent>
          </TimelineListItem>
        );

        if (index === 0 || activity.date !== activityData[index - 1].date) {
          return (
            <Fragment key={`list-item-${index}`}>
              <TimelineHeader>
                <TimelineTitle>
                  {moment(activity.date).format('MMMM DD')}
                </TimelineTitle>
                <TimelineHorizontalDivider />
              </TimelineHeader>
              {TimelineListItemComponent}
            </Fragment>
          );
        }
        return TimelineListItemComponent;
      })}
    </TimelineContainer>
  );
};

UserTimelineView.propTypes = {
  attempting: T.array.isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleRemoveIssue: T.func.isRequired,
  userId: T.string.isRequired,
  watching: T.array.isRequired,
};

export default UserTimelineView;
